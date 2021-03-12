/**
 * Seed the database
 */
const UserModel = require("../models/User");

const data = [
  {
    username: "admin",
    name: "Administrator",
    password: "1234",
    isAdmin: true,
  },
  {
    username: "Jonh_Doe",
    name: "Jonh Doe",
    password: "1234",
    isAdmin: false,
  },
  {
    username: "Queen_Elisabeth",
    name: "Isabell",
    password: "1234",
    isAdmin: true,
  },
  {
    username: "Carlos_99",
    name: "Carlos Santana",
    password: "1234",
    isAdmin: false,
  },
  {
    username: "World_Ruller",
    name: "Vanessa Zurich",
    password: "1234",
    isAdmin: false,
  },
  {
    username: "JaneParker",
    name: "Jane Parker",
    password: "1234",
    isAdmin: false,
  },
  {
    username: "RobertCountry",
    name: "Robert Jonhson",
    password: "1234",
    isAdmin: false,
  },
  {
    username: "Danierusan",
    name: "Daniel Albino",
    password: "1234",
    isAdmin: true,
  },
  {
    username: "CarolDenvers",
    name: "Caroline Denvers",
    password: "1234",
    isAdmin: false,
  },
  {
    username: "InspectorGadget",
    name: "Antony Lazaro",
    password: "1234",
    isAdmin: false,
  },
];

data.forEach((object) => {
  UserModel.create(object)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => console.error(error));
});
