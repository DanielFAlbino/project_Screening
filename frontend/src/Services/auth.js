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

export { me, login };
