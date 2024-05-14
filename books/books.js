//load express
const express = require("express");
const app = express();

//loading all env variables
require("dotenv").config();

//Load mongoose
const mongoose = require("mongoose");

//connect to db
const MONGODB_URL = process.env.MONGODB_URL;
try {
  mongoose.connect(MONGODB_URL);
  console.log("Connected to db (bookservice)");
} catch (error) {
  console.log("error: ", error);
}

app.get("/", (req, res) => {
  res.send("This is our main endpoint!");
});

app.listen(4545, () => {
  console.log("Up and running! -- This is our book service");
});
