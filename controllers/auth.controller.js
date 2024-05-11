const validateData = require("../common/validate");
const registerUserSchema = require("../payloads/requests/register-user.request.payload");
const { hashPassword } = require("../common/hash");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../services/auth.service");
const loginSchema = require("../payloads/requests/login.request.payload");

exports.registerUser = async (req, res) => {
  try {
    const body = validateData(req.body, registerUserSchema);
    const token = await registerUser(body);
    return res.json({
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const body = validateData(req.body, loginSchema);
    const token = await loginUser(body);
    return res.json({
      token,
    });
    // Find user by email
    // Compare passwords
    // Generate JWT token
    // Return token
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logoutUser = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  await logoutUser(token);
  res.json({
    message: "You are logged out successfully",
  });
};

exports.socialLogin = async (req, res) => {
  try {
    // Handle social login (Google, Facebook, Twitter, GitHub)
    // Create or find user in database
    // Generate JWT token
    // Return token
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
