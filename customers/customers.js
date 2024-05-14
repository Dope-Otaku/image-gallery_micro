const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

//loading all env variables
require("dotenv").config();

//connect to db
const MONGODB_URL = process.env.MONGODB_URL;
try {
  mongoose.connect(MONGODB_URL);
  console.log("Connected to db (customerservice)");
} catch (error) {
  console.log("error: ", error);
}
//Load model
require("./customer_schema.js");
const Customer = mongoose.model("Customer");

//create functionalities
app.post("/customer", (req, res) => {
  let newCustomer = {
    name: req.body.name,
    age: req.body.age,
    address: req.body.address,
  };
  let customer = new Customer(newCustomer);

  customer
    .save()
    .then(() => {
      console.log("new customer added");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
  res.send("A new customer created with success!");
});

app.get("/customers", (req, res) => {
  Customer.find()
    .then((customers) => {
      res.json(customers);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.get("/customer/:id", (req, res) => {
  Customer.findById(req.params.id)
    .then((customer) => {
      if (customer) {
        res.json(customer);
      } else {
        console.log("Invalid Id");
        res.send("Invalid Id");
      }
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.delete("/customer/:id", (req, res) => {
  Customer.findByIdAndDelete(req.params.id)
    .then((customer) => {
      if (customer) {
        console.log(`customer with id:${req.params.id} deleted successfully`);
      } else {
        res.send("Customer Not Found!");
      }
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
  res.send(`customer with id:${req.params.id} deleted successfully`);
});

//server listening on 5555
app.listen(5555, () => {
  console.log("up and running -- This is our customers service");
});
