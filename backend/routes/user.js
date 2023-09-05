const express = require("express");
// controller functions
const { loginUser, signUpUser } = require("../controllers/userController");

const router = express.Router();

// log-in routes
router.post("/login", loginUser);

// sign-up routes
router.post("/signup", signUpUser);

module.exports = router;
