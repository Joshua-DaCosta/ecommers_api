//register
const router = require("express").Router();
const User = require("../models/user.js");
const CryptoJS = require("crypto-js");

router.post("/register", async (req, res) => {
  const { username, password, email, isAdmin } = req.body;
  const newUser = new User({
    username,
    password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
    email,
    isAdmin,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//login
router.post("/login", async (req, res) => {
  const { username, password} = req.body;
  try {
    const user = await User.findOne({ username });
    !user && res.status(401).json("wrong credentials");

    const hashedPass = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const pass = hashedPass.toString();
    pass !== password && res.status(401).json("wrong credentials");

    const {password, ...others} = user._doc;
    res.status(200).json(others);
  } catch (error) {}
});
module.exports = router;
