import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const Context = createContext();

const URL = "http://localhost:9000";

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const resp = await fetch(`${URL}/cities`);
        const data = await resp.json();
        // console.log("Fetched json data -> ", data);
        setCities(data);
      } catch {
        alert("Error fetching cities");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCities();
  }, []);

  const setCity = useCallback(async (id) => {
    try {
      setIsLoading(true);
      const resp = await fetch(`${URL}/cities/${id}`);
      const data = await resp.json();
      // console.log("Fetched json data -> ", data);
      setCurrentCity(data);
    } catch {
      alert(`Error fetching City -> ${id}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addCity = useCallback(async (city) => {
    try {
      setIsLoading(true);
      const resp = await fetch(`${URL}/cities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(city),
      });
      const data = await resp.json();
      setCities((cities) => [...cities, data]);
      console.log("Added city ->", data);
    } catch {
      alert(`Error adding City -> ${city.cityName}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <Context.Provider
      value={{ cities, isLoading, setCity, currentCity, addCity }}
    >
      {children}
    </Context.Provider>
  );
}

const useCitiesContext = () => {
  const context = useContext(Context);
  if (context === undefined)
    throw new Error("Context is Outside of its Provider.");
  return context;
};

export { CitiesProvider, useCitiesContext };
