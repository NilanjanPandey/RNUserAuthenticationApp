import axios from "axios";

const _APIKEY = "AIzaSyCRXUnNd_vWoL6W3X9zjBTLldvzG0ql6UU";
const _URL = "https://identitytoolkit.googleapis.com/v1/accounts:";
let body = {
  email: "",
  password: "",
  returnSecureToken: true,
};

export async function createUser(mode, email, password) {
  body = {
    email: email,
    password: password,
    returnSecureToken: true,
  };
  const response = await axios.post(`${_URL}${mode}?key=${_APIKEY}`, body);
  return response.data.idToken;
}

export async function authenticateUser(mode, email, password) {
  body = {
    email: email,
    password: password,
    returnSecureToken: true,
  };
  const response = await axios.post(`${_URL}${mode}?key=${_APIKEY}`, body);
  //   return response.json()
  return response.data.idToken;
}
