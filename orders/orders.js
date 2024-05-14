const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

//loading all env variables
require("dotenv").config();

//connect to db
const MONGODB_URL = process.env.MONGODB_URL;
try {
  mongoose.connect(MONGODB_URL);
  console.log("Connected to db (orders service)");
} catch (error) {
  console.log("error: ", error);
}

//Load model
const Order = require("./order_schema.js");

app.post("/order", (req, res) => {
  let newOrder = {
    customerID: new mongoose.Types.ObjectId(req.body.customerID),
    bookID: new mongoose.Types.ObjectId(req.body.bookID),
    initialDate: req.body.initialDate,
    deliveryDate: req.body.deliveryDate,
  };

  let order = new Order(newOrder);

  order
    .save()
    .then((order) => {
      if (order) {
        console.log("Order created with success");
        res.send("Order created with success");
      } else {
        res.send("An error occurred");
      }
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.get("/orders", (req, res) => {
  Order.find()
    .then((orders) => {
      res.json(orders);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.get("/order/:id", (req, res) => {
  Order.findById(req.params.id)
    .then((order) => {
      if (order) {
        axios
          .get(`http://localhost:5555/customer/${order.customerID}`)
          .then((response) => {
            let orderObject = {
              customerName: response.data.name,
              bookTitle: "",
            };

            axios
              .get(`http://localhost:4545/book/${order.bookID}`)
              .then((response) => {
                orderObject.bookTitle = response.data.title;
                res.json(orderObject);
              });
            console.log(response.data);
            // res.send("quick response");
          });
      } else {
        res.status(404).send("Invalid Order");
      }
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.listen(7777, () => {
  console.log("up and running - orders service");
});
