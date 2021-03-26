const CollectionModel = require("../models/CollectionModel");
const CardModel = require("../models/CardModel");

const ObjectID = require("mongodb").ObjectID;

const handleValidation = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message:
        "The object is empty! please provide collection name or cards list",
    });
  }

  if (Object.keys(req.body).length > 0 && !req.body.collectionName) {
    return res.status(400).json({
      message: "Please provide collection name.",
    });
  }

  if (
    Object.keys(req.body).length >= 2 &&
    (!req.body.collectionName ||
      !req.body.cardsList ||
      !Array.isArray(req.body.cardsList))
  ) {
    return res.status(400).json({
      message:
        "Please only provide collection name and cards list, cards list must be an array of objects.",
    });
  }

  /*  if (Object.keys(req.body).length > 2) {
    return res.status(400).json({
      message: "Please only provide collection name and cards list.",
    });
  } */

  if (req.body.collectionName.trim() == "") {
    return res.status(400).json({
      message: "collection name can't be empty!",
    });
  }

  //Verify if cards Id keys are correct or not
  const cards = req.body.cardsList ? req.body.cardsList : null;
  if (cards) {
    cards.map((card) => {
      const ids = Object.keys(card);
      ids.map((id) => {
        if (id !== "_id") {
          return res.status(400).json({
            message:
              "Please correct your cards list. some of the id's keys are wrong. Provide a correct key.",
          });
        }
      });

      //Verify if cards Lists Id's are empty
      const values = Object.values(card);
      values.map((value) => {
        if (value.trim() === "") {
          return res.status(400).json({
            message:
              "Please correct your cards list. some of the id's values are empty.",
          });
        }
      });
    });

    //Verify if there are more then 4 cards of the same card
    cards.map((card) => {
      let count = 0;
      cards.map((card2) => {
        if (card._id == card2._id) {
          count++;
        }
      });
      if (count > 4) {
        return res.status(400).json({
          message:
            "You can only have 4 cards of the same card in the collection!",
        });
      }
    });

    //Verify if cards id's are correct or not
    cards.map((card) => {
      const match = ObjectID.isValid(card._id);
      if (!match) {
        return res.status(400).json({
          message:
            "Please correct your cards list. some of the id's value are wrong. Provide a correct Id.",
        });
      }
    });
  }
  return cards;
}; // End handleValidation

exports.get = async (req, res) => {
  if (!req._user.isAdmin) {
    return res.status(401).json({ message: "You don't have permission" });
  }
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
        .json({ message: "You don't have any collections." });
    }

    if (!req._user.isAdmin && req._user._id != collections.userId) {
      return res.status(401).json({ message: "You don't have permission" });
    }

    return res.status(200).json({ collections });
  } catch (err) {
    throw err;
  }
};

exports.getByUser = async (req, res) => {
  if (!req._user.isAdmin && req._user._id != req.params.userId) {
    return res.status(401).json({ message: "You don't have permission" });
  }
  const _id = req.params.userId;
  try {
    const collections = await CollectionModel.find({
      userId: _id,
    });
    if (!collections || collections.length == 0) {
      return res
        .status(404)
        .json({ message: "You don't have any collections." });
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
  if (!req._user.isAdmin && req._user._id != data[0].userId) {
    return res.status(401).json({ message: "You don't have permission" });
  }

  const cards = handleValidation(req, res);

  req.body.userId = data[0].userId;

  //Verify if cards belongs to User
  var verified;
  if (cards) {
    verified = await Promise.all(
      cards.map(async (card) => {
        const onCard = await CardModel.findOne({
          _id: card._id,
        });
        if (onCard.userId != req.body.userId) {
          return res.status(400).json({
            message:
              "Please correct your cards list. some of the cards don't bellong to you!",
          });
        }
      })
    );

    verified.map((check, index) => {
      if (!check) {
        verified.splice(index, 1);
      }
    });

    verified.map((check, index) => {
      if (!check) {
        verified.splice(index, 1);
      }
    });
  }
  if (!cards || (verified && verified[0] == undefined)) {
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
  }
};

exports.add = async (req, res) => {
  if (req._user.isAdmin) {
    return res.status(401).json({ message: "You don't have permission" });
  }

  const cards = handleValidation(req, res);

  //Verify if cards belongs to User
  var verified;
  if (cards) {
    verified = await Promise.all(
      cards.map(async (card) => {
        const onCard = await CardModel.findOne({
          _id: card._id,
        });
        if (onCard.userId != req._user._id) {
          return res.status(400).json({
            message:
              "Please correct your cards list. some of the cards don't bellong to you!",
          });
        }
      })
    );

    verified.map((check, index) => {
      if (!check) {
        verified.splice(index, 1);
      }
    });

    verified.map((check, index) => {
      if (!check) {
        verified.splice(index, 1);
      }
    });
  }
  if (!cards || (verified && verified[0] == undefined)) {
    let data = req.body;
    data.userId = req._user._id;
    await CollectionModel.create(data)
      .then(() => {
        return res.status(200).json({ message: "Collection Resgistered!" });
      })
      .catch((error) => {
        return res.status(400).json({ message: error.message });
      });
  }
};

exports.delete = async (req, res) => {
  const _id = req.params.collectionId;
  const data = await CollectionModel.find({ _id });

  if (data.length === 0) {
    return res.status(404).json({ message: "Collection not found" });
  }

  if (!req._user.isAdmin && req._user._id != data[0].userId) {
    return res.status(401).json({ message: "You don't have permission" });
  }

  await CollectionModel.findByIdAndRemove({ _id })
    .then(() => {
      return res.status(200).json({ message: "Collection was deleted!" });
    })
    .catch((error) => {
      return res.status(400).json({ message: error });
    });
};
