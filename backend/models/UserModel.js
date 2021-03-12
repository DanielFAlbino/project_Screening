const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const saltRounds = 10;

const userDataSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: false, unique: false },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
  },
  {
    collection: "users",
    timestamps: true,
  }
);
userDataSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("password")) {
    const document = this;
    bcrypt.hash(document.password, saltRounds, function (err, hashedPassword) {
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

userDataSchema.plugin(uniqueValidator);
const userModel = mongoose.model("User", userDataSchema);
module.exports = userModel;
