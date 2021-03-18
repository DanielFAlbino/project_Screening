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
  const collectionParams = {
    user: req.body.user,
    collectionName: req.body.collectionName,
    cardsList: req.body.cardsList,
  };

  await CollectionModel.updateOne({ _id }, { $set: collectionParams })
    .then(() => {
      return res.status(200).json("Collection was updated!");
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
};

exports.add = async (req, res) => {
  if (req._user.isAdmin) {
    return res.status(401).json({ message: "You don't have permition" });
  }
  let data = req.body;
  data.userId = req._user._id;
  await CollectionModel.create(data)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => console.error(error));
};

exports.delete = async (req, res) => {
  const _id = req.params.collectionId;
  await CollectionModel.findByIdAndRemove({ _id })
    .then(() => {
      return res.status(200).json({ message: "Collection was deleted!" });
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
};
