/* import api from "./api"; */
import axios from "axios";
import { getToken } from "../Utils/localStorage";
const URL = process.env.REACT_APP_API_URL || "http://localhost:3000";
const config = {
  headers: {
    Authorization: "Bearer " + getToken(),
  },
};

async function getUser(userId) {
  const res = await axios.get(URL + "/api/user/" + userId, config);
  return res ? res.data : "username or password incorrect";
}

async function update(payload) {
  const res = await axios.post(URL + "/api/user/update/", payload);
  return res ? res.data : "username or password incorrect";
}

async function remove(payload) {
  const res = await axios.delete(URL + "/api/user/delete/", payload);
  return res ? res.data : "username or password incorrect";
}

export { getUser, update, remove };
