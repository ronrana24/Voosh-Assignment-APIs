const bcrypt = require("bcrypt");

const hashPassword = async (rawPassword) => {
  const saltRounds = 10;
  const generatedSalts = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(rawPassword, generatedSalts);
  return hashedPassword;
};

const comparePassword = async (hashedPassword, rawPassword) => {
  const isEqual = await bcrypt.compare(rawPassword, hashedPassword);
  return isEqual;
};

module.exports = {
  comparePassword,
  hashPassword,
};
