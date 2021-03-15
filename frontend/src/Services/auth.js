/* import api from "./api"; */
import axios from "axios";
const URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

async function me() {
  const res = await axios.get("/auth/me");
  return res ? res.data.user : null;
}

async function login(payload) {
  const res = await axios.post(URL + "/api/auth/login", payload);
  return res ? res.data : "username or password incorrect";
}

async function update(payload) {
  const res = await axios.post(URL + "/api/user/update/user", payload);
  return res ? res.data : "username or password incorrect";
}

async function checkAuth(payload) {
  const res = await axios.post(URL + "/api/auth/verify", payload);
  return res ? res.data : "User not logged In!";
}

export { me, login, update, checkAuth };
