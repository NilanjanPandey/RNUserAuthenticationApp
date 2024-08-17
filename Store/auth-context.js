import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AuthContext = createContext({
  _token: "",
  _isAuthenticated: false,
  _authenticate: (token) => {},
  _logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  async function getTokenFromDevice() {
    const storedToken = await AsyncStorage.getItem("token");
    if (storedToken) {
      setAuthToken(storedToken);
    }
  }
  useEffect(() => {
    getTokenFromDevice();
  }, []);

  function authenticate(token) {
    // console.log("store--- authenticate fn triggered.", token)
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
  }
  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem('token')
  }
  const value = {
    _token: authToken,
    _isAuthenticated: !!authToken,
    _authenticate: authenticate,
    _logout: logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
