const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
require("dotenv").config();

exports.login = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      username: req.body.username,
    })
      .select("password")
      .exec();

    if (!user) {
      return res.status(400).send({ message: "The username does not exist" });
    }

    //Hash password
    await bcrypt.compare(req.body.password, user.password).then((result) => {
      if (result) {
        const token = jwt.sign(
          {
            userId: user._id,
          },
          process.env.JWT_KEY,
          {
            expiresIn: process.env.JWT_HOURS_DURATION + "h",
          }
        );

        user.password = undefined;
        return res.status(200).send({ token, user });
      }

      return res.status(400).send({ message: "Wrong username or password" });
    });
  } catch (err) {
    throw err;
  }
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
      return res.status(404);
    }
    return res.status(200).json(user);
  } catch (err) {
    throw err;
  }
};

exports.signup = async (req, res) => {
  const user = await UserModel.findOne({
    username: req.body.username,
  });

  if (!user) {
    // Create an user object
    let user = new UserModel({
      username: req.body.username,
      name: req.body.name,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
    });

    // Save User in the database
    user.save((err, registeredUser) => {
      if (err) {
        console.log(err);
      } else {
        // create payload then Generate an access token
        let payload = { id: registeredUser._id, isAdmin: req.body.isAdmin };
        jwt.sign(payload, process.env.JWT_KEY);

        res.status(200).send("Registed!");
      }
    });
  } else {
    return res.status(409).json("Username already exists!");
  }
};
