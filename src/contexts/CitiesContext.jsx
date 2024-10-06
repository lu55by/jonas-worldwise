import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();

const URL = "http://localhost:9000";

function CitiesContext({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
  return (
    <Context.Provider value={{ cities, isLoading }}>
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

export { CitiesContext, useCitiesContext };
