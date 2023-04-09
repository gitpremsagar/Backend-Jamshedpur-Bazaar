const express = require("express");
const router = express.Router();

// Orders API endpoints:
// o /api/orders - GET: Retrieve all orders
router.get("/", (req, res) => {
  res.send("Retrieve all orders");
});

// o /api/orders/:id - GET: Retrieve a single order by ID
router.get("/:id", (req, res) => {
  res.send("Retrieve a single order by ID");
});

// o /api/orders - POST: Create a new order
router.post("/", (req, res) => {
  res.send("Create a new order");
});

// o /api/orders/:id - PUT: Update an order by ID
router.put("/", (req, res) => {
  res.send("Update an order by ID");
});

// o /api/orders/:id - DELETE: Delete an order by ID
router.delete("/", (req, res) => {
  res.send("Delete an order by ID");
});

module.exports = router;
