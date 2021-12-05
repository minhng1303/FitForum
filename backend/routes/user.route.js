const express = require("express");
const User = require("../models/user.model");
const router = express.Router();
const userService = require("../services/user.service");
const auth = require("../middleware/auth");
const { json } = require("express");

router.get("/", userService.getAllUser);

router.post("/logout", auth, async (req, res) => {
  // Log user out of the application
  try {
    // const tokenArray = req.user.tokens;
    req.user.token = "";
    await req.user.save();
    res.status(200).json({ message: "Log out successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:userName", async (req, res) => {
  let userName = req.params.userName;
  try {
    const user = await User.findOne({ username: userName });
    res.status(200).json({ profile: user });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/:username", async (req, res) => {
  try {
    let username = req.params.username;
    let body = req.body.user;
    // console.log(body);
    let updatedUser = await User.updateOne(
      { username: username },
      {
        $set: {
          ...body,
        },
      }
    );
    res
      .status(201)
      .json({ user: updatedUser, message: "Update Profile Successful" });
  } catch (error) {
    console.log(error);
    json.status(500).json({ message: error });
  }
});

module.exports = router;
