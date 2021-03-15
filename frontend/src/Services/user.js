/* import api from "./api"; */
import axios from "axios";
const URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

async function update(payload) {
  const res = await axios.post(URL + "/api/user/update/", payload);
  return res ? res.data : "username or password incorrect";
}

async function remove(payload) {
  const res = await axios.delete(URL + "/api/user/delete/", payload);
  return res ? res.data : "username or password incorrect";
}

export { update, remove };
