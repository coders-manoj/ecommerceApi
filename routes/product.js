const upload = require("../middlewares/upload");
const verifyToken = require("../middlewares/verifyToken");
const router = require("express").Router();
const product = require("../models/productSchema");
const user = require("../models/userSchema");

// product add
router.post("/", verifyToken, upload.single("file"), async (req, res) => {
  try {
    const finduser = await user.findById(req.user._id);
    if (finduser) {
      const newProduct = new product({
        ...req.body,
        img: req.file.fieldname,
      });
      const response = await product.create(newProduct);
      res.status(201).json({ message: "created product", data: response });
    } else {
      res.status(401).json("you are not able to add");
    }
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

// all products
router.get("/", async (req, res) => {
  const response = await product.find();
  res.status(200).json({ message: "all products", data: response });
});
module.exports = router;
