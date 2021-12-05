const tagDao = require("../models/tag.model");

const tagService = {};

tagService.getTags = async (req, res) => {
  const tagList = await tagDao.find({}).limit(10);
  res.status(200).json({ tags: tagList });
};

module.exports = tagService;
