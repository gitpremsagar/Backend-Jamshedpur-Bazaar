const express = require("express");
const router = express.Router();
const makeQueryToDatabase = require("../../modules/mysqlConnect");

// top-categories API endpoints:
// o /api/categories - GET: Retrieve all categories
router.get("/", async (req, res) => {
  try {
    const sql = `SELECT * FROM categories;`;
    const [rows, fields] = await makeQueryToDatabase(sql);

    res.send(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error in Retrieving all categories");
  }
});

// o /api/categories/:id - GET: Retrieve a single category by ID
router.get("/:id", (req, res) => {
  res.send("Retrieve a single category by ID");
});

// o /api/categories - POST: Create a new category
router.post("/", (req, res) => {
  res.send("Create a new category");
});

// o /api/categories/:id - PUT: Update a category by ID
router.put("/", (req, res) => {
  res.send("Update a category by ID");
});

// o /api/categories/:id - DELETE: Delete an category by ID
router.delete("/:id", (req, res) => {
  const categoryIDToDelete = req.params.id;
  res.send(`Delete a category by ID = ${categoryIDToDelete}`);
});

module.exports = router;
