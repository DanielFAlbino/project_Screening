/* import api from "./api"; */
import axios from "axios";
import { getToken } from "../Utils/localStorage";
const URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";
const config = {
  headers: {
    Authorization: "Bearer " + getToken(),
  },
};

async function register(payload) {
  const res = await axios.post(URL + "/collection/add", payload, config);
  return res ? res.data : "card not found!";
}

async function getCollection(collectionId) {
  const res = await axios.get(URL + "/collection/" + collectionId, config);
  return res ? res.data : "card not found!";
}
async function getCollectionByUser(userId) {
  const res = await axios.get(URL + "/collection/user/" + userId, config);
  return res ? res.data : "card not found!";
}

async function getAllCollection() {
  const res = await axios.get(URL + "/collection/all", config);
  return res ? res.data : "card not found!";
}

async function update(collectionId, payload) {
  const res = await axios.put(
    URL + "/collection/update/" + collectionId,
    payload,
    config
  );
  return res ? res.data : "card not found!";
}

async function remove(collectionId) {
  const res = await axios.delete(
    URL + "/collection/delete/" + collectionId,
    config
  );
  return res ? res.data : "card not found!";
}

export {
  register,
  getCollectionByUser,
  getCollection,
  update,
  remove,
  getAllCollection,
};
