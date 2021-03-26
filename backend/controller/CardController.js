const CardModel = require("../models/CardModel");
const CollectionModel = require("../models/CollectionModel");

const handleValidation = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message:
        "The object is empty! please provide collection name or cards list",
    });
  }
  if (
    Object.keys(req.body).length > 0 &&
    (!req.body.name || !req.body.description || !req.body.cardNumber)
  ) {
    return res.status(400).json({
      message:
        "Fields required! Please provide name, description and card number. ",
    });
  }
  if (req.body.cardNumber <= 0) {
    return res.status(400).json({
      message: "Card number must be higher then 0",
    });
  }

  /* if (Object.keys(req.body).length > 3) {
    return res.status(400).json({
      message: "Please only provide name, description and card number.",
    });
  } */

  if (isNaN(req.body.cardNumber)) {
    return res.status(400).json({
      message: "The card number is not a number!",
    });
  }
}; // End handleValidation

exports.getCardsByUser = async (req, res) => {
  if (!req._user.isAdmin && req._user._id != req.params.userId) {
    return res.status(401).json({ message: "You don't have permition" });
  }
  try {
    const cards = await CardModel.find({
      userId: req.params.userId,
    }).select("+cardNumber");

    if (!cards) {
      return res.status(404).json({ message: "Cards not found!" });
    }
    return res.status(200).json({ cards });
  } catch (err) {
    throw err;
  }
};

exports.getCardById = async (req, res) => {
  try {
    const card = await CardModel.findOne({
      _id: req.params.cardId,
    }).select("+cardNumber");
    if (!card) {
      return res.status(404).json({ message: "Card not found!" });
    }
    if (!req._user.isAdmin && req._user._id != card.userId) {
      return res.status(401).json({ message: "You don't have permition" });
    }

    return res.status(200).json({ card });
  } catch (err) {
    throw err;
  }
};

exports.getAllCards = async (req, res) => {
  if (!req._user.isAdmin) {
    return res.status(401).json({ message: "You don't have permission" });
  }
  try {
    const cards = await CardModel.find().select("+cardNumber");
    if (!cards) {
      return res.status(404).json({ message: "No cards were found!" });
    }
    return res.status(200).json({ cards });
  } catch (err) {
    throw err;
  }
};

exports.add = async (req, res) => {
  if (req._user.isAdmin) {
    return res.status(401).json({ message: "You don't have permission" });
  }
  handleValidation(req, res);

  const card = await CardModel.findOne({
    cardNumber: req.body.cardNumber,
  });

  if (req.body.cardNumber <= 0) {
    return res.status(400).json({
      message: "Card number must be higher then 0",
    });
  }

  if (!card) {
    let cards = {
      name: req.body.name,
      cardNumber: req.body.cardNumber,
      description: req.body.description,
    };

    cards.userId = req._user._id;
    /*  cards.name = cards.name.trim(); */

    await CardModel.create(cards)
      .then(() => {
        return res.status(200).json({ message: "Success!" });
      })
      .catch((error) => {
        return res
          .status(409)
          .json({ message: "A card with that name already exists" });
      });
  }

  return res.status(409).json({ message: "Card or Number already exists!" });
};

exports.update = async (req, res) => {
  const _id = req.params.cardId;
  const data = await CardModel.find({ _id });

  if (data.length === 0) {
    return res.status(404).json({ message: "Card not found" });
  }

  if (!req._user.isAdmin && req._user._id != data[0].userId) {
    return res.status(401).json({ message: "You don't have permition" });
  }

  handleValidation(req, res);

  const cards = await CardModel.find({
    cardNumber: req.body.cardNumber,
  });

  if (cards.length > 0 && cards[0]._id != req.params.cardId) {
    return res.status(400).json({
      message: "There is a card with that card number, please change it!",
    });
  }

  const cards2 = await CardModel.find({
    name: req.body.name,
  });

  if (cards2.length > 0 && cards2[0]._id != req.params.cardId) {
    return res.status(400).json({
      message: "There is a card with that name, please change it!",
    });
  }

  const cardParams = {
    name: req.body.name,
    cardNumber: req.body.cardNumber,
    description: req.body.description,
  };

  await CardModel.updateOne({ _id: _id }, { $set: cardParams })
    .then(() => {
      return res.status(200).json({ message: "Card updated!" });
    })
    .catch((error) => {
      return res.status(400).json({ message: error });
    });
};

exports.delete = async (req, res) => {
  const _id = req.params.cardId;
  const data = await CardModel.find({ _id });
  if (data.length === 0) {
    return res.status(404).json({ message: "Card not found" });
  }
  if (!req._user.isAdmin && req._user._id != data[0].userId) {
    return res.status(401).json({ message: "You don't have permition" });
  }

  await CardModel.deleteOne({ _id }).then((result) => {
    if (result.deletedCount > 0) {
      const collections = CollectionModel.find(data[0].userId);
      console.log(collections);
      return res.status(200).json({ message: "Card deleted!" });
    }
  });
};
