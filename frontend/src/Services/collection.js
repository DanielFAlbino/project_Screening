/* import api from "./api"; */
import axios from "axios";
import { getToken } from "../Utils/localStorage";
const URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";
const config = {
  headers: {
    Authorization: "Bearer " + getToken(),
  },
};
async function getCollection(collectionId) {
  const res = await axios.get(URL + "/collection/" + collectionId, config);
  return res ? res.data : "card not found!";
}
async function getAllCollection() {
  const res = await axios.get(URL + "/collection/all", config);
  return res ? res.data : "card not found!";
}

async function updateCollection(payload) {
  const res = await axios.post(URL + "/collection/update/", payload);
  return res ? res.data : "card not found!";
}

async function removeCollection(payload) {
  const res = await axios.delete(URL + "/collection/delete/", payload);
  return res ? res.data : "card not found!";
}

export { getCollection, updateCollection, removeCollection, getAllCollection };
