const CardModel = require("../models/CardModel");

exports.getCardsByUser = async (req, res) => {
  try {
    const cards = await CardModel.findOne({
      userId: req.params.userId,
    });
    if (!cards) {
      return res.status(404).json({ message: "Cards not found!" });
    }
    return res.status(200).json({ cards });
  } catch (err) {
    throw err;
  }
};

exports.getAllCards = async (req, res) => {
  if (!req._user.isAdmin) {
    return res.status(401).json({ message: "You don't have permition" });
  }
  try {
    const cards = await CardModel.find();
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
    return res.status(401).json({ message: "You don't have permition" });
  }

  const card = await CardModel.findOne({
    cardNumber: req.body.cardNumber,
  });
  if (!card) {
    let cards = req.body;
    cards.userId = req._user._id;

    await CardModel.create(cards)
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((error) => {
        return res.status(400).json({ error: error });
      });
  }
  return res.status(409).json({ message: "That card already exists" });
};

exports.update = async (req, res) => {
  const _id = req.params.cardId;
  const cardParams = {
    name: req.body.name,
    cardNumber: req.body.cardNumber,
    description: req.body.description,
  };

  await CardModel.updateOne({ _id }, { $set: cardParams })
    .then(() => {
      return res.status(200).json({ message: "Card updated!" });
    })
    .catch((error) => {
      return res.status(400).json({ error: erro });
    });
};

exports.delete = async (req, res) => {
  const _id = req.params.cardId;
  const card = await CardModel.findOne({
    _Id: _id,
  });
  console.log(card);
  if (card) {
    await CardModel.findByIdAndRemove({ _id })
      .then(() => {
        return res.status(200).json({ message: "Card deleted!" });
      })
      .catch((error) => {
        return res.status(400).json({ error: error });
      });
  }
};
