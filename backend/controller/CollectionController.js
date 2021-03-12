const CollectionModel = require("../models/CollectionModel");

exports.get = async (req, res) => {
  try {
    const collections = await CollectionModel.findOne({
      collection: req.body.collection,
    });
    if (!collections) {
      return res.status(404);
    }
    return res.status(200).json(collections);
  } catch (err) {
    throw err;
  }
};

exports.update = async (req, res) => {
  const { _id } = req.body;
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
  await CollectionModel.create(req.body)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => console.error(error));
};

exports.delete = async (req, res) => {
  const _id = req.params.collectionId;
  await CollectionModel.findByIdAndRemove({ _id })
    .then(() => {
      return res.status(200).json("Collection was deleted!");
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
};
