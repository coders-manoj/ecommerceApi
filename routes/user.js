const verifyToken = require("../middlewares/verifyToken");

const router = require("express").Router();

// user update
router.put("/:id", verifyToken, (req, res) => {
  if (req.user._id === req.params.id) {
    res.send("Hello");
  } else {
    res.status(401).json("you are not able to updtae");
  }
});

module.exports = router;
