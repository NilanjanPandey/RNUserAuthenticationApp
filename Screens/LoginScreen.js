import { useState, useContext } from "react";
import AuthContent from "../Components/Auth/AuthContent";
import { authenticateUser } from "../utils/auth";
import LoadingOverlay from "../Components/UI/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../Store/auth-context";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);
  async function authenticationHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await authenticateUser(
        "signInWithPassword",
        email,
        password
      );
      // console.log("Loginscreen -- Token", token);
      authCtx._authenticate(token);
      // console.log("loginScreen--context:--", authCtx);
    } catch (error) {
      // console.log(error)
      Alert.alert("Authetication Failed!", "Could not log you in!");
      setIsAuthenticating(false);
    }
    
  }
  if (isAuthenticating) {
    return <LoadingOverlay message="Logging in..." />;
  }
  return <AuthContent isLogin onAuthenticate={authenticationHandler} />;
}

export default LoginScreen;
