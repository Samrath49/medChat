const router = require("express").Router();
const { json } = require("express");
const User = require("../models/User");

// Creating User
router.post("/", async (req, res) => {
  try {
    const { username, email, password, picture } = req.body;
    console.log("User req body", req.body);
    const user = await User.create({ username, email, password, picture });
    res.status(201).json(user);
  } catch (e) {
    let msg;
    if (e.code == 11000) {
      msg = "User already exists";
    } else {
      msg = e.message;
    }
    console.log(e);
    res.status(400).json(msg);
  }
});

// Login User

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findByCredentials(username, password);
    user.status = "online";
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

module.exports = router;
