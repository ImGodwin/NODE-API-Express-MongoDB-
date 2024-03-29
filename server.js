const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const { error } = require("console");
const app = express();

app.use(express.json()); //for middleware

app.get("/", (req, res) => {
  res.send(`Hello Node API`);
});

app.post("/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).jdon({ message: error.message });
  }
});

//get all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get single product

app.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//update a product

app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    //if item is not inside the DB

    if (!product) {
      return res.status(404).json({ message: `cannot find any product with ID ${id}` });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete a product

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb+srv://godwinmail6:-FcxiJcNTtCGS2.@nodeapi.fyfadpt.mongodb.net/Node-API?retryWrites=true&w=majority")
  .then(() => {
    console.log("connected to mongoDB");
    app.listen(3000, () => {
      console.log(`Node API is running on port 3000`);
    });
  })
  .catch(error => {
    console.log(error);
  });
