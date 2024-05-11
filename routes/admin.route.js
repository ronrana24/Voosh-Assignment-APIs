const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const adminController = require("../controllers/admin.contorller");

router.get("/", (req, res) => {
  res.json({ message: "Hello from Admin API" });
});

router.get("/profiles", authMiddleware.isAdmin, adminController.getAllProfiles);

module.exports = router;
