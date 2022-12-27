const router = require("express").Router();
const user = require("../models/userSchema");
var CryptoJS = require("crypto-js");

// user register
router.post("/register", async (req, res) => {
  try {
    const newUser = new user({
      ...req.body,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.CRYPTO_SECRET
      ).toString(),
    });
    const response = await user.create(newUser);
    res.status(201).json({
      success: true,
      message: "user registered success",
      data: response,
      error: false,
    });
  } catch (error) {
    const key = Object.keys(error.keyValue);
    res.status(401).json({
      success: false,
      message: `this ${key[0]} already exists`,
      data: error.keyValue,
      error: true,
    });
  }
});

module.exports = router;
