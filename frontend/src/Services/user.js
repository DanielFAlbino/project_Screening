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

async function getUsers() {
  const res = await axios.get(URL + "/api/user/users/all", config);
  return res ? res.data : "username or password incorrect";
}

async function update(userId, payload) {
  const res = await axios.put(
    URL + "/api/user/update/" + userId,
    payload,
    config
  );
  return res ? res.data : "username or password incorrect";
}

async function remove(userId) {
  const res = await axios.delete(URL + "/api/user/delete/" + userId, config);
  return res ? res.data : "username or password incorrect";
}

export { getUser, getUsers, update, remove };
