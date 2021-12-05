const userDao = require("../models/user.model");

const questionServices = {};

questionServices.getAllUser = async (req, res) => {
  const users = await userDao.find({}).limit(10);
  res.status(200).json({ users: users });
};

module.exports = questionServices;
