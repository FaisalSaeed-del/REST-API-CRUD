const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// mongodb connect

mongoose
  .connect("mongodb://localhost:27017/mern", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is connected");
  })
  .catch(() => {
    console.log("Eroor");
  });

// Product Schema

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

// Model
const Product = new mongoose.model("Product", productSchema);

// Prodcut Create
app.post("/api/v1/product/new", async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// Rroduct Read (Find)

app.get("/api/v1/products", async (req, res) => {
  const prodcuts = await Product.find();

  res.status(200).json({
    success: true,
    prodcuts,
  });
});

// Update Product

app.put("/api/v1/product/:id", async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      Message: "product not found",
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: true,
    runValidator: true,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

// delete Product

app.delete("/api/v1/product/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      Message: "product not found",
    });
  }

  await prodcut.remove();

  res.status(200).json({
    success: true,
    Message: "product is deleted",
  });
});

app.listen(3000, () => {
  console.log("server is running on port 3000....");
});
