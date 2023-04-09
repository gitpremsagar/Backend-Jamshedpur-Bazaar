const express = require("express");
const router = express.Router();

// Customers API endpoints:
// o /api/customers - GET: Retrieve all customers
router.get("/", (req, res) => {
  res.send("Retrieve all customers");
});

// o /api/customers/:id - GET: Retrieve a single customer by ID
router.get("/:id", (req, res) => {
  res.send("Retrieve a single customer by ID");
});

// o /api/customers - POST: Create a new customer
router.post("/", (req, res) => {
  res.send("Create a new customer");
});

// o /api/customers/:id - PUT: Update a customer by ID
router.put("/:id", (req, res) => {
  res.send("Update a customer by ID");
});

// o /api/customers/:id - DELETE: Delete a customer by ID
router.delete("/:id", (req, res) => {
  res.send("Delete a customer by ID");
});
