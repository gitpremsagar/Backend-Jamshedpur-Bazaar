const express = require("express");
const router = express.Router();

// Products API endpoints:
// o /api/products - GET: Retrieve all products
router.get("/", (req, res) => {
  res.send("Retrieve all products");
});

// o /api/products/:id - GET: Retrieve a single product by ID
router.get("/:id", (req, res) => {
  res.send("Retrieve a single product by ID");
});

// o /api/products - POST: Create a new product
router.post("/", (req, res) => {
  res.send("Create a new product");
});

// o /api/products/:id - PUT: Update a product by ID
router.put("/:id", (req, res) => {
  res.send("Update a product by ID");
});

// o /api/products/:id - DELETE: Delete a product by ID
router.delete("/:id", (req, res) => {
  res.send("Delete a product by ID");
});

module.exports = router;
