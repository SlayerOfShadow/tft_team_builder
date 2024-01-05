import { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const auth = getAuth();
  const [authState, setAuthState] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthState(user);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };