const mongoose = require("mongoose");

const blackListTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
});

const Token = mongoose.model("BlackList", blackListTokenSchema);

module.exports = Token;
