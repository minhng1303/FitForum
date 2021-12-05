const express = require("express");
const router = express.Router();
const tagService = require("../services/tag.service");

router.get("/", tagService.getTags);

module.exports = router;
