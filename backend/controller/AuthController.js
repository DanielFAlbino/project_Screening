const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
require("dotenv").config();

exports.login = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      message: "Please fill all the fields!",
    });
  }
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "The object is empty! please provide username and password",
    });
  }

  if (
    (Object.keys(req.body).length > 0 &&
      (!req.body.username || !req.body.password)) ||
    Object.keys(req.body).length > 2
  ) {
    return res.status(400).json({
      message: "Please only provide correct username and password keys/values",
    });
  }

  if (!isNaN(req.body.username)) {
    return res.status(400).json({
      message: "Username can't contain only numbers",
    });
  }

  if (typeof req.body.password !== "string") {
    return res.status(400).json({
      message: "Password must be a string",
    });
  }

  const user = await UserModel.findOne({
    username: req.body.username,
  })
    .select("password")
    .select("isAdmin")
    .exec();

  if (!user) {
    return res.status(404).json({ message: "Username not found!" });
  }

  //Hash password
  await bcrypt.compare(req.body.password, user.password).then((result) => {
    if (result) {
      const token = jwt.sign(
        {
          userId: user._id,
          admin: user.isAdmin,
        },
        process.env.JWT_KEY,
        {
          expiresIn: process.env.JWT_HOURS_DURATION + "h",
        }
      );

      user.password = undefined;
      return res.status(200).json({ token, user });
    }

    return res.status(400).json({ message: "Wrong username or password" });
  });
};
exports.isLogged = (req, res) => {};

exports.getMe = (req, res) => {
  return res.jsend.success({ user: req._user });
};

exports.getUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      _id: req.body._id,
    });
    if (!user) {
      return res.status(404).json({ message: "user not found!" });
    }
    return res.status(200).json({ user });
  } catch (err) {
    throw err;
  }
};

exports.signup = async (req, res) => {
  const findUser = await UserModel.findOne({
    username: req.body.username,
  });

  if (findUser) {
    return res.status(409).json({ message: "Username already exists!" });
  }

  var regex = /^[a-zA-Z]+$/;
  const result = regex.test(req.body.name);
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message:
        "The object is empty! please provide username, name and password",
    });
  }
  if (Object.keys(req.body).length < 3) {
    return res.status(400).json({
      message:
        "There are fields missing! Please provide username, name and password",
    });
  }
  if (!req.body.username || !req.body.name || !req.body.password) {
    return res.status(400).json({
      message: "Please fill all the fields!",
    });
  }
  if (
    (Object.keys(req.body).length > 0 &&
      (!req.body.username || !req.body.name || !req.body.password)) ||
    Object.keys(req.body).length > 3
  ) {
    return res.status(400).json({
      message: "Please only provide username, name and password",
    });
  }
  if (!isNaN(req.body.username))
    return res.status(400).json({
      message: "Username can't contain only numbers",
    });

  if (!result) {
    return res
      .status(400)
      .json({ message: "Name must contain only letters and can't be empty" });
  }

  if (
    !req.body.username.trim() ||
    !req.body.name.trim() ||
    !req.body.password.trim()
  ) {
    return res.status(400).json({ message: "All fields required!" });
  }

  if (!req.body.username || !req.body.name || !req.body.password) {
    return res
      .status(400)
      .json({ message: "Please provide username, name and password" });
  }

  // Create an user object
  let user = await new UserModel({
    username: req.body.username,
    name: req.body.name,
    password: req.body.password,
    isAdmin: false,
  });
  // Save User in the database
  if (user) {
    user.save((err, registeredUser) => {
      if (err) {
        console.log(err);
      } else {
        // create payload then Generate an access token
        let payload = { id: registeredUser._id, isAdmin: req.body.isAdmin };
        jwt.sign(payload, process.env.JWT_KEY);
        return res.status(200).json({ message: "Registed!" });
      }
    });
  }
};
