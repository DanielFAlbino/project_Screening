const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const cardDataSchema = new Schema(
  {
    name: { type: String, required: true, unique: false },
    description: { type: String, required: true, unique: false },
    cardNumber: { type: Number, required: true, select: false },
    userId: { type: String, required: true, unique: false },
  },
  {
    collection: "cards",
    timestamps: true,
  }
);

cardDataSchema.plugin(uniqueValidator);
const cardModel = mongoose.model("Card", cardDataSchema);
module.exports = cardModel;
