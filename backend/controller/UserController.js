const UserModel = require("../models/UserModel");

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

exports.update = async (req, res) => {
  const { _id } = req.body;
  const userParams = {
    username: req.body.username,
    name: req.body.name,
    password: req.body.password,
    isAdmin: req.doby.isAdmin,
  };
  await UserModel.updateOne({ _id }, { $set: userParams })
    .then(() => {
      return res.status(200).json("User was updated!");
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
};

exports.delete = async (req, res) => {
  const _id = req.params.userId;
  await UserModel.findByIdAndRemove({ _id })
    .then(() => {
      return res.status(200).json("User was deleted!");
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
};
