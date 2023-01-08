const verifyToken = require("../middlewares/verifyToken");
const router = require("express").Router();
const user = require("../models/userSchema");
const upload = require("../middlewares/upload");

// user update
router.put("/:id", verifyToken, upload.single("file"), async (req, res) => {
  if (req.user._id === req.params.id) {
    await user.updateOne(
      { _id: req.params.id },
      {
        $set: {
          ...req.body,
          img: req.file.filename,
        },
      }
    );
    const finduser = await user.findOne({ _id: req.params.id });
    res.status(201).json({ message: "updated user", data: finduser });
  } else {
    res.status(401).json("you are not able to update");
  }
});

module.exports = router;
