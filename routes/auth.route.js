const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /accounts/:
 *   get:
 *     summary: Get sample response
 *     responses:
 *       200:
 *         description: Returns sample data
 */
router.get("/", (req, res) => {
  res.json({ message: "Hello from Auth API" });
});

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/logout", authMiddleware.authenticateUser, authController.logoutUser);
router.post("/social-login", authController.socialLogin);

module.exports = router;
