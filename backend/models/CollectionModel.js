const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const collectionDataSchema = new Schema(
  {
    userId: { type: String, required: false, unique: false },
    collectionName: { type: String, required: true, unique: false },
    cardsList: [{ _id: String }],
  },
  {
    collection: "collections",
    timestamps: true,
  }
);

collectionDataSchema.plugin(uniqueValidator);
const cardModel = mongoose.model("Collection", collectionDataSchema);
module.exports = cardModel;
