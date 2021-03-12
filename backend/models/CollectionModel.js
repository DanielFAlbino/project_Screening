const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const collectionDataSchema = new Schema(
  {
    user: { type: String, required: true, unique: false },
    collectionName: { type: String, required: true, unique: false },
    cardsList: [{ name: String, cardNumber: Number, description: String }],
  },
  {
    collection: "collections",
    timestamps: true,
  }
);

collectionDataSchema.plugin(uniqueValidator);
const cardModel = mongoose.model("Collection", collectionDataSchema);
module.exports = cardModel;
