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

app.get("/books", (req, res) => {
  Book.find()
    .then((books) => {
      // console.log(books);
      res.json(books);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.get("/book/:id", (req, res) => {
  Book.findById(req.params.id)
    .then((book) => {
      try {
        if (book) {
          res.json(book);
        } else {
          res.sendStatus(404);
        }
      } catch (err) {
        console.log(err);
      }
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.delete("/book/:id", (req, res) => {
  Book.findByIdAndDelete(req.params.id)
    .then((book) => {
      if (book) {
        console.log(`Book with id:${req.params.id} has been deleted`);
      } else {
        res.sendStatus(404); // Send a 404 status if the book is not found
      }
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
  res.send(`Book with id:${req.params.id} has been deleted`);
});

//server listening on port 4545
app.listen(4545, () => {
  console.log("Up and running! -- This is our book service");
});
