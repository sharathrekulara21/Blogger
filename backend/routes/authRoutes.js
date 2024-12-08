const express = require("express");
const router = express.Router();
const { signup } = require("../controllers/authController");

// POST /signup - Adds a new user to the DB
router.post("/signup", signup);

module.exports = router;
