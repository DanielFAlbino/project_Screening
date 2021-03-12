require("dotenv").config();
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

exports.checkAuth = async (req, res, next) => {
  try {
    const headerReq = req.headers.authorization;
    const splitedHeader = headerReq.split(" ");
    if (splitedHeader.length !== 2) throw "Unauthenticated";

    const scheme = splitedHeader[0];
    const token = splitedHeader[1];

    if (!/^Bearer$/i.test(scheme)) throw "Unauthenticated";

    const tokenUser = jwt.verify(token, process.env.JWT_KEY);
    const user = await UserModel.findById(tokenUser.userId);
    if (!user) {
      throw "Unauthenticated";
    }

    req._user = user;
    return next();
  } catch (error) {
    return res.status(400).send({
      message: "Unauthenticated",
    });
  }
};
