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
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });
    !user && res.status(401).json("wrong credentials");

    const hashedPass = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const pass = hashedPass.toString();
    pass !== req.body.password && res.status(401).json("wrong credentials");

    const accessToken = jwt.sign({
        id:user._id, isAdmin: user.isAdmin
    }, 
    process.env.JWT_SEC,
    {expiresIn: '3d'});

    const {password, ...others} = user._doc;
    res.status(200).json({...others, accessToken});
  } catch (error) {}
});
module.exports = router;
