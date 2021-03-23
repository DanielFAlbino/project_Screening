const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");

exports.get = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      _id: req.params.userId,
    });
    if (!user) {
      return res.status(404);
    }
    return res.status(200).json(user);
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
  if (
    JSON.stringify(req._user._id) !== JSON.stringify(req.params.userId) &&
    !req._user.isAdmin
  ) {
    return res.status(401).json({ message: "You don't have permition" });
  }
  const user = await UserModel.findOne({
    _id: req.params.userId,
  });
  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }

  const _id = req.params.userId;
  const userParams = {
    username: req.body.username,
    name: req.body.name,
    isAdmin: req.body.isAdmin,
  };

  if (req.body.password) {
    bcrypt.hash(req.body.password, 10).then(async (hash) => {
      await UserModel.updateOne({ _id }, { $set: { password: hash } });
    });
  }

  await UserModel.updateOne({ _id }, { $set: userParams })
    .then(() => {
      return res.status(200).json({ message: "User was updated!" });
    })
    .catch((error) => {
      return res.status(400).json({ error: error });
    });
};

exports.delete = async (req, res) => {
  if (!req._user.isAdmin) {
    return res.status(401).json({ message: "You don't have permition" });
  }
  const _id = req.params.userId;
  await UserModel.findByIdAndRemove({ _id })
    .then(() => {
      return res.status(200).json({ message: "User was deleted!" });
    })
    .catch((error) => {
      return res.status(400).json({ message: error });
    });
};
