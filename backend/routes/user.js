const express = require("express");
// controller functions
const { loginUser, signUpUser } = require("../controllers/userController");

const router = express.Router();

// log-in routes
router.post("/login", loginUser);

// sign-up routes
router.post("/sign-up", signUpUser);

module.exports = router;
