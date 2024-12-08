// routes/users.js
const express = require("express");
const router = express.Router();
const { getUserById, updateUser } = require("../controllers/userController");
const verifyToken = require("../middleware/authMiddleware.js");
const { findUser, updateProfile } = require("../controllers/userController.js");

// GET /users/:id - Finding a user with auth
router.get("/:id", verifyToken, findUser);

// PUT /users/:id - Edit their profile
router.put("/:id", verifyToken, updateProfile);

module.exports = router;
