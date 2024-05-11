const { hashPassword, comparePassword } = require("../common/hash");
const generateAccessToken = require("../common/tokenization");
const User = require("../models/user");
const { addToken } = require("../repositories/blacklistToken.repository");
const { getUserByEmailAddress } = require("../repositories/user.respository");

const registerUser = async (requestBody) => {
  const hashedPassword = await hashPassword(requestBody.password);

  const userModel = new User({
    email: requestBody.email,
    name: requestBody.name,
    password: hashedPassword,
  });

  const userSchema = await userModel.save();

  console.log(userSchema);

  const token = generateAccessToken(userSchema);

  return token;
};

const loginUser = async (requestBody) => {
  const userSchema = await getUserByEmailAddress(requestBody.email);

  if (!userSchema) {
    return null;
  }

  const isPasswordEqual = await comparePassword(
    userSchema.password,
    requestBody.password
  );

  if (!isPasswordEqual) {
    return null;
  }

  const token = generateAccessToken(userSchema);

  return token;
};

const logoutUser = async (token) => {
  await addToken(token);
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
