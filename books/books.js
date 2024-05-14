//load express
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

//Load mongoose
const mongoose = require("mongoose");
require("./book_schema.js");
const Book = mongoose.model("Book");

//loading all env variables
require("dotenv").config();

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

//create functionalitites

app.post("/book", (req, res) => {
  let newBook = {
    title: req.body.title,
    author: req.body.author,
    numberOfPages: req.body.numberOfPages,
    publisher: req.body.publisher,
  };

  //create a new book
  let book = new Book(newBook);

  book
    .save()
    .then(() => {
      console.log("new book added");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });

  res.send("A new book created with success!");
});

app.listen(4545, () => {
  console.log("Up and running! -- This is our book service");
});
