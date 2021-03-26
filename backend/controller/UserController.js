const UserModel = require("../models/UserModel");
const CollectionModel = require("../models/CollectionModel");
const CardModel = require("../models/CardModel");

const bcrypt = require("bcryptjs");

exports.get = async (req, res) => {
  if (!req._user.isAdmin && req._user._id != req.params.userId) {
    return res.status(401).json({ message: "You don't have permition" });
  }
  try {
    const user = await UserModel.findOne({
      _id: req.params.userId,
    });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.status(200).json({ user });
  } catch (err) {
    throw err;
  }
};

exports.getAll = async (req, res) => {
  if (!req._user.isAdmin) {
    return res.status(401).json({ message: "You don't have permition" });
  }
  try {
    const users = await UserModel.find({}, { _id: 1, name: 1, username: 1 });
    if (!users) {
      return res.status(404).json({ message: "Users not found!" });
    }
    return res.status(200).json({ users });
  } catch (err) {
    throw err;
  }
};

exports.update = async (req, res) => {
  if (!req._user.isAdmin && req._user._id != req.params.userId) {
    return res.status(401).json({ message: "You don't have permition" });
  }

  if (
    JSON.stringify(req._user._id) !== JSON.stringify(req.params.userId) &&
    !req._user.isAdmin
  ) {
    return res.status(401).json({ message: "You don't have permition" });
  }

  if (
    Object.keys(req.body).length > 0 &&
    (!req.body.name || !req.body.username)
  ) {
    return res.status(400).json({
      message: "Username and Name are required!",
    });
  }
  if (
    Object.keys(req.body).length > 4 ||
    (Object.keys(req.body).length >= 4 &&
      (!req.body.name ||
        !req.body.username ||
        req.body.isAdmin == null ||
        !req.body.password))
  ) {
    return res.status(400).json({
      message:
        "Please only provide username and name (required), admin or password(optional)",
    });
  }

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "The object is empty! please provide username and name",
    });
  }
  var regex = /^[a-zA-Z/ /]+$/;
  const result = regex.test(req.body.name.trim());
  if (!result) {
    return res
      .status(400)
      .json({ message: "Name must only contain letters and can't be empty" });
  }
  const user = await UserModel.findOne({
    _id: req.params.userId,
  });
  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }

  const _id = req.params.userId;
  let useParams;
  if (req.body.password) {
    userParams = {
      username: req.body.username,
      name: req.body.name,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
    };
  } else {
    userParams = {
      username: req.body.username,
      name: req.body.name,
      isAdmin: req.body.isAdmin,
    };
  }

  if (req.body.password) {
    bcrypt.hash(req.body.password, 10).then(async (hash) => {
      await UserModel.updateOne({ _id }, { $set: { password: hash } });
    });
  }

  await UserModel.updateOne({ _id }, { $set: userParams }).then(() => {
    return res.status(200).json({ message: "User was updated!" });
  });
};

exports.delete = async (req, res) => {
  if (!req._user.isAdmin && req._user._id != req.params.userId) {
    return res.status(401).json({ message: "You don't have permition" });
  }
  const _id = req.params.userId;
  const data = await UserModel.find({ _id });
  if (data.length === 0) {
    return res.status(404).json({ message: "User not found" });
  }
  await CollectionModel.deleteMany({ userId: _id });
  await CardModel.deleteMany({ userId: _id });
  await UserModel.findOneAndDelete({ _id })
    .then(async () => {
      return res.status(200).json({ message: "User was deleted!" });
    })
    .catch((error) => {
      return res.status(400).json({ message: error });
    });
};
