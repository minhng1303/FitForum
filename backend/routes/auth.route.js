const express = require("express");
const User = require("../models/user.model");
const router = express.Router();
const authService = require("../services/auth.service");

router.post("/signup", authService.signup);

router.post("/login", authService.login);

module.exports = router;
