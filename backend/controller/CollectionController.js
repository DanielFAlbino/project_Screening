const CollectionModel = require("../models/CollectionModel");

exports.get = async (req, res) => {
  try {
    const collections = await CollectionModel.find();
    if (!collections) {
      return res.status(404).json({ message: "No collections to list" });
    }
    return res.status(200).json({ collections });
  } catch (err) {
    throw err;
  }
};

exports.getCollection = async (req, res) => {
  const _id = req.params.collectionId;
  try {
    const collections = await CollectionModel.findOne({
      _id: _id,
    });
    if (!collections || collections.length == 0) {
      return res
        .status(404)
        .json({ message: "The User doesn't have any collections." });
    }
    return res.status(200).json({ collections });
  } catch (err) {
    throw err;
  }
};
exports.getByUser = async (req, res) => {
  const _id = req.params.userId;
  try {
    const collections = await CollectionModel.find({
      userId: _id,
    });
    if (!collections || collections.length == 0) {
      return res
        .status(404)
        .json({ message: "The User doesn't have any collections." });
    }
    return res.status(200).json({ collections });
  } catch (err) {
    throw err;
  }
};

exports.update = async (req, res) => {
  const _id = req.params.collectionId;
  const data = await CollectionModel.find({ _id });
  if (data.length === 0) {
    return res.status(404).json({ message: "Collection not found" });
  }

  await CollectionModel.findOneAndUpdate({ _id }, { $set: req.body })
    .then((result) => {
      if (result) {
        return res.status(200).json({ message: "Collection was updated!" });
      }
      return res.status(304).json({ message: "Collection not updated!" });
    })
    .catch((error) => {
      return res.status(400).json({ message: error });
    });
};

exports.add = async (req, res) => {
  if (req._user.isAdmin) {
    return res.status(401).json({ message: "You don't have permition" });
  }
  let data = req.body;
  data.userId = req._user._id;
  await CollectionModel.create(data)
    .then(() => {
      return res.status(200).json({ message: "Collection Resgistered!" });
    })
    .catch((error) => {
      return res.status(400).json({ message: error });
    });
};

exports.delete = async (req, res) => {
  const _id = req.params.collectionId;
  const data = await CollectionModel.find({ _id });
  if (data.length === 0) {
    return res.status(404).json({ message: "Collection not found" });
  }
  await CollectionModel.findByIdAndRemove({ _id })
    .then(() => {
      return res.status(200).json({ message: "Collection was deleted!" });
    })
    .catch((error) => {
      return res.status(400).json({ message: error });
    });
};
