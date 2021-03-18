/* import api from "./api"; */
import axios from "axios";
import { getToken } from "../Utils/localStorage";
const URL = process.env.REACT_APP_API_URL || "http://localhost:3000";
const config = {
  headers: {
    Authorization: "Bearer " + getToken(),
  },
};

async function getCards(userId) {
  const res = await axios.get(URL + "/api/card/user/" + userId, config);
  return res ? res.data : "card not found!";
}

async function getCard(cardId) {
  const res = await axios.get(URL + "/api/card/" + cardId, config);
  return res ? res.data : "card not found!";
}

async function getAllCards() {
  const res = await axios.get(URL + "/api/card/cards/all", config);
  return res ? res.data : "card not found!";
}

async function update(userId, payload) {
  const res = await axios.put(
    URL + "/api/card/update/" + userId,
    payload,
    config
  );
  return res ? res.data : "card not found!";
}

async function remove(payload) {
  const res = await axios.delete(URL + "/api/card/delete/", payload);
  return res ? res.data : "card not found!";
}

export { update, remove, getAllCards, getCards, getCard };
