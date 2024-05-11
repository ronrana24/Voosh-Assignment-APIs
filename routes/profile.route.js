const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile.controller");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", (req, res) => {
  res.json({ message: "Hello from Profile API" });
});

router.get(
  "/profile",
  authMiddleware.authenticateUser,
  profileController.getProfile
);
router.put(
  "/profile",
  authMiddleware.authenticateUser,
  profileController.updateProfile
);

router.put(
  "/toggle-access",
  authMiddleware.authenticateUser,
  profileController.toggleProfileAccess
);

router.get(
  "/profiles",
  profileController.getProfiles
);

module.exports = router;
