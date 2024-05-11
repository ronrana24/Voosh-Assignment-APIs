const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { checkForToken } = require("../repositories/blacklistToken.repository");

exports.authenticateUser = async (req, res, next) => {
  try {
    // Extract JWT token from header
    const token = req.headers.authorization.split(" ")[1];
    const isTokenExist = await checkForToken(token);
    if (!token || isTokenExist) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Verify token
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!decodedToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Attach user data to request object
    req.user = decodedToken;

    // Proceed to next middleware
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

exports.isAdmin = async (req, res, next) => {
  if (
    req.body.username === process.env.ADMIN_USERNAME &&
    req.body.password === process.env.ADMIN_PASSWORD
  ) {
    next();
  }
  return res.status(401).json({ error: "Unauthorized" });
};

exports.ensurePublicProfile = async (req, res, next) => {
  try {
    // Check if user profile is public
    const user = await User.findById(req.params.userId);
    if (!user || !user.profile.isPublic) {
      // If profile is not public, and user is not admin, return unauthorized
      if (req.userId !== req.params.userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }
    }

    // Proceed to next middleware
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

exports.checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/view");
}
