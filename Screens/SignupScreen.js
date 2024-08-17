import { useState, useContext } from "react";
import { createUser } from "../utils/auth";
import AuthContent from "../Components/Auth/AuthContent";
import LoadingOverlay from "../Components/UI/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../Store/auth-context";
// import { createUser } from "../utils/auth";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);
  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser("signUp", email, password);
      authCtx._authenticate(token);
      // console.log("SignupScreen---TOken", token);
      // console.log("SignupScreen---Context", authCtx);
    } catch (error) {
      Alert.alert("User cannot be created!", "Please check your input.");
      setIsAuthenticating(false);
    }
  }
  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }
  return <AuthContent onAuthenticate={signupHandler} />;
}
export default SignupScreen;
