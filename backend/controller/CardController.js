const CardModel = require("../models/CardModel");

exports.getCardsByUser = async (req, res) => {
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

  const card = await CardModel.findOne({
    cardNumber: req.body.cardNumber,
  });

  if (!card) {
    let cards = req.body;
    cards.userId = req._user._id;

    await CardModel.create(cards)
      .then(() => {
        return res.status(200).json({ message: "Success!" });
      })
      .catch((error) => {
        return res.status(400).json({ message: error });
      });
  }

  return res.status(409).json({ message: "Card or Number already exists!" });
};

exports.update = async (req, res) => {
  const _id = req.params.cardId;
  console.log(req.body);
  const data = await CardModel.find({ _id });
  console.log(data.length);
  if (data.length === 0) {
    return res.status(404).json({ message: "Card not found" });
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
      return res.status(400).json({ message: erro });
    });
};

exports.delete = async (req, res) => {
  const _id = req.params.cardId;
  const data = await CardModel.find({ _id });
  console.log(data.length);
  if (data.length === 0) {
    return res.status(404).json({ message: "Card not found" });
  }
  await CardModel.deleteOne({ _id }).then((result) => {
    if (result.deletedCount > 0) {
      return res.status(200).json({ message: "Card deleted!" });
    }
  });
};
