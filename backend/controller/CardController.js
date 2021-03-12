const CardModel = require("../models/CardModel");

exports.getCardsByUser = async (req, res) => {
  try {
    const user = await CardModel.findOne({
      username: req.body.username,
    });
    if (!user) {
      return res.status(404);
    }
    return res.status(200).json(user);
  } catch (err) {
    throw err;
  }
};

exports.add = async (req, res) => {
  const card = await CardModel.findOne({
    cardNumber: req.body.cardNumber,
  });
  if (!card) {
    await CardModel.create(req.body)
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((error) => {
        return res.status(400).send(error);
      });
  }
  return res.status(409).json("That card already exists");
};

exports.update = async (req, res) => {
  const { _id } = req.body;
  const cardParams = {
    name: req.body.name,
    cardNumber: req.body.cardNumber,
    description: req.body.description,
  };

  await CardModel.updateOne({ _id }, { $set: cardParams })
    .then(() => {
      return res.status(200).json("Card updated!");
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
};

exports.delete = async (req, res) => {
  const _id = req.params.cardId;
  await CardModel.findByIdAndRemove({ _id })
    .then(() => {
      return res.status(200).json("Card deleted!");
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
};
