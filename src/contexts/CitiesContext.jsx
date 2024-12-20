import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const Context = createContext();

const URL = "http://localhost:9000";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, cities: action.payload, isLoading: false };
    case "city/loaded":
      return { ...state, currentCity: action.payload, isLoading: false };
    case "city/added":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((c) => c.id !== action.payload),
        isLoading: false,
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action.");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    const fetchCities = async () => {
      try {
        dispatch({ type: "loading" });
        const resp = await fetch(`${URL}/cities`);
        const data = await resp.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({ type: "rejected", payload: "Failed to load cities." });
      }
    };
    fetchCities();
  }, []);

  const setCurrentCityById = useCallback(
    async (id) => {
      if (currentCity.id === Number(id)) return;
      try {
        dispatch({ type: "loading" });
        const resp = await fetch(`${URL}/cities/${id}`);
        const data = await resp.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: `Error fetching city with id -> ${id}.`,
        });
      }
    },
    [currentCity.id]
  );

  const addCity = useCallback(async (city) => {
    try {
      dispatch({ type: "loading" });
      const resp = await fetch(`${URL}/cities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(city),
      });
      const data = await resp.json();
      dispatch({ type: "city/added", payload: data });
      console.log("Added city ->", data);
    } catch {
      dispatch({
        type: "rejected",
        payload: `Error adding City -> ${city.cityName}.`,
      });
    }
  }, []);

  const deleteCity = useCallback(async (id) => {
    const city2Delete = cities.find((c) => c.id === id);
    try {
      dispatch({ type: "loading" });
      await fetch(`${URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
      console.log("Deleted city ->", city2Delete.cityName);
    } catch {
      dispatch({
        type: "rejected",
        payload: `Error deleting City -> ${city2Delete.cityName}.`,
      });
    }
  }, []);

  return (
    <Context.Provider
      value={{
        cities,
        isLoading,
        setCurrentCityById,
        currentCity,
        addCity,
        deleteCity,
        error,
      }}
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
