const Token = require("../models/blacklistToken");

const checkForToken = async (token) => {
  const blackListTokenSchema = await Token.findOne({
    token,
  });

  if (blackListTokenSchema) {
    return true;
  }
  return false;
};

const addToken = async (token) => {
  const blackListTokenSchema = new Token({
    token
  })

  await blackListTokenSchema.save();
};

module.exports = {
  addToken,
  checkForToken,
};
