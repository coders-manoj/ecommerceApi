const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv/config");
const auth = require("./routes/auth");
const user = require("./routes/user");
const product = require("./routes/product");

// connection with database
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI, () => {
  console.log("Connected with database");
});

// middlewares
app.use(express.json());

// routes
app.use("/api/auth", auth);
app.use("/api/users", user);
app.use("/api/products", product);

app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});

// server listen
app.listen(process.env.PORT || 4000, () => {
  console.log(`Server started at ${process.env.PORT} port`);
});
