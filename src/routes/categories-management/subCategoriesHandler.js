const express = require("express");
const router = express.Router();
const makeQueryToDatabase = require("../../modules/mysqlConnect");

// sub-categories API endpoints:
// o /api/sub-categories - GET: Retrieve all sub-categories
router.get("/", async (req, res) => {
  try {
    const sql = `SELECT * FROM sub_categories;`;
    const [rows, fields] = await makeQueryToDatabase(sql);

    res.send(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error in Retrieving all sub-categories");
  }
});

// o /api/sub-categories/:id - GET: Retrieve a single sub-category by ID
router.get("/:id", (req, res) => {
  res.send("Retrieve a single sub-category by ID");
});

// o /api/sub-categories - POST: Create a new sub-category
router.post("/", async (req, res) => {
  const newSubCategory = req.body.newSubCategory;
  const sql = "INSERT into sub_categories (sub_category_name) VALUES (?);";
  try {
    const [rows, fields] = await makeQueryToDatabase(sql, [newSubCategory]);
    const result = await makeQueryToDatabase(
      `SELECT * FROM sub_categories WHERE sub_category_id = ?;`,
      [rows.insertId]
    );
    // console.log(result[0][0]);
    res.status(201).json({ created: true, insertedRow: result[0][0] });
  } catch (error) {
    res.status(500).json({ created: false });
  }
});

// o /api/sub-categories/:id - PUT: Update an sub-category by ID
router.put("/:id", (req, res) => {
  res.send("Update sub-category by ID");
});

// o /api/sub-categories/:id - DELETE: Delete a sub category by ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM `sub_categories` WHERE (`sub_category_id` = ?);";
  try {
    const [rows, fields] = await makeQueryToDatabase(sql, [id]);
    if (rows.affectedRows > 0) res.json({ deleted: true });
  } catch (error) {
    res.status(500).json({ deleted: false });
  }
});

module.exports = router;
