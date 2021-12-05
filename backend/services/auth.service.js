const userDao = require("../models/user.model");
const User = require("../models/user.model");
const authService = {};

authService.signup = async (req, res) => {
  // Create a new user
  try {
    const user = new User(req.body);
    await user.save();
    // const token = await user.generateToken();
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

authService.login = async (req, res) => {
  //Login a registered user
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res
        .status(401)
        .send({ error: "Login failed! Check authentication credentials" });
    }
    const token = await user.generateToken();
    res.send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

module.exports = authService;
