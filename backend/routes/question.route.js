const express = require("express");
const router = express.Router();
const question = require("../services/question.service");

router.get("/", question.getAllQuestions);

router.post("/:topic", question.startAttempt);

module.exports = router;
