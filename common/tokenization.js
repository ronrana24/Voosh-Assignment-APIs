const jwt = require("jsonwebtoken");

const generateAccessToken = (userSchema) => {
  return jwt.sign(
    {
      email: userSchema.email,
      id: userSchema._id.toString(),
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

module.exports = generateAccessToken;
