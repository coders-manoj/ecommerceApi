const router = require("express").Router();
const user = require("../models/userSchema");
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

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

// user login
router.post("/token", async (req, res) => {
  try {
    const response = await user.findOne({ email: req.body.email });
    if (response) {
      const originalPassword = CryptoJS.AES.decrypt(
        response.password,
        process.env.CRYPTO_SECRET
      ).toString(CryptoJS.enc.Utf8);
      if (originalPassword === req.body.password) {
        const { password, ...others } = response._doc;
        const token = jwt.sign(others, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        res.status(200).json({
          message: "log in success",
          data: others,
          access_token: token,
          success: true,
          error: false,
        });
      } else {
        res
          .status(401)
          .json({ message: "wrong password", success: false, error: true });
      }
    } else {
      res
        .status(401)
        .json({ message: "user not found", success: false, error: true });
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
});

module.exports = router;
