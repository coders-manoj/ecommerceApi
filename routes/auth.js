const router = require("express").Router();
const user = require("../models/userSchema");

// user register
router.post("/register", async (req, res) => {
  try {
    const newUser = new user({
      ...req.body,
    });
    const response = await user.create(newUser);
    res.status(201).json({
      succss: true,
      message: "user registered success",
      data: response,
      error: false,
    });
  } catch (error) {
    const key = Object.keys(error.keyValue);
    res.status(401).json({
      succss: false,
      message: `${key[0]} should be unique`,
      data: error.keyValue,
      error: true,
    });
  }
});

module.exports = router;
