const express = require("express");
const cors = require("cors");
require("dotenv").config();
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("port", process.env.PORT || 3000);

app.use(cors());

app.use("/api/auth", routes.auth);
app.use("/api/user", routes.user);
app.use("/api/card", routes.card);
app.use("/api/collection", routes.collection);

module.exports = app;
