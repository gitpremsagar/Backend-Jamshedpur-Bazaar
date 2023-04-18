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

// o /api/top-categories/:id - GET: Retrieve a single top-category by ID
router.get("/:id", (req, res) => {
  res.send("Retrieve a single top-category by ID");
});

// o /api/top-categories - POST: Create a new top-category
router.post("/", async (req, res) => {
  const newTopCategory = req.body.newTopCategory;
  const sql = "INSERT into top_categories (top_category_name) VALUES (?);";
  try {
    const [rows, fields] = await makeQueryToDatabase(sql, [newTopCategory]);
    const result = await makeQueryToDatabase(
      `SELECT * FROM top_categories WHERE top_category_id = ?;`,
      [rows.insertId]
    );
    // console.log(result[0][0]);
    res.status(201).json({ created: true, insertedRow: result[0][0] });
  } catch (error) {
    res.status(500).json({ created: false });
  }
});

// o /api/top-categories/:id - PUT: Update an top-category by ID
router.put("/:id", (req, res) => {
  res.send("Update top-category by ID");
});

// o /api/top-categories/:id - DELETE: Delete an order by ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM `top_categories` WHERE (`top_category_id` = ?);";
  try {
    const [rows, fields] = await makeQueryToDatabase(sql, [id]);
    if (rows.affectedRows > 0) res.json({ deleted: true });
  } catch (error) {
    res.status(500).json({ deleted: false });
  }
});

module.exports = router;
