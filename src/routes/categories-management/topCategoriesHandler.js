const express = require("express");
const router = express.Router();
const makeQueryToDatabase = require("../../modules/mysqlConnect");

// top-categories API endpoints:
// o /api/top-categories - GET: Retrieve all top-categories
router.get("/", async (req, res) => {
  try {
    const sql = `SELECT * FROM top_categories;`;
    const [rows, fields] = await makeQueryToDatabase(sql);

    res.send(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error in Retrieving all top-categories");
  }
});

// o /api/top-categories/:id - GET: Retrieve a single order by ID
router.get("/:id", (req, res) => {
  res.send("Retrieve a single top-category by ID");
});

// o /api/top-categories - POST: Create a new top-category
router.post("/", (req, res) => {
  res.send("Create a new top-category");
});

// o /api/top-categories/:id - PUT: Update an top-category by ID
router.put("/", (req, res) => {
  res.send("Update top-category by ID");
});

// o /api/top-categories/:id - DELETE: Delete an order by ID
router.delete("/", (req, res) => {
  res.send("Delete an order by ID");
});

module.exports = router;

module.exports = router;
