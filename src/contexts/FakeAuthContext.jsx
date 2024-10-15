import { createContext, useContext, useReducer } from "react";

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};


const initialState = {
  user: null,
  isAuthenticated: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error(`Unknown action -> ${action.type}!`);
  }
};

const Context = createContext();
function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const login = (email, password) => {
    // Simple logic, change later
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    } else {
      // Handle error or display an alert
      alert("Invalid Authentication. Please try again!");
    }
  };

  const logout = () => {
    dispatch({ type: "logout" });
  };

  return (
    <Context.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </Context.Provider>
  );
}

function useAuth() {
  const authContext = useContext(Context);
  if (authContext === undefined)
    throw new Error("Context outside of the Provider!");
  return authContext;
}

export { AuthProvider, useAuth };
