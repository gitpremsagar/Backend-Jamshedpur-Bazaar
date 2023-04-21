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
router.post("/", async (req, res) => {
  const newCategory = req.body.newCategory;
  const parentTopCategoryID = req.body.parentCategoryID;
  console.log(req.body);
  const sql =
    "INSERT into categories (category_name,parent_top_category_id ,parent_top_category_name) VALUES ( ?, ? ,(select top_category_name from top_categories where top_category_id = ?));";
  try {
    const [rows, fields] = await makeQueryToDatabase(sql, [
      newCategory,
      parentTopCategoryID,
      parentTopCategoryID,
    ]);
    const result = await makeQueryToDatabase(
      `SELECT * FROM categories WHERE category_id = ?;`,
      [rows.insertId]
    );
    // console.log(result[0][0]);
    res.status(201).json({ created: true, insertedRow: result[0][0] });
  } catch (err̥or) {
    console.log(
      "🚀 ~ file: categoriesHandler.js:37 ~ router.post ~ err̥or:",
      err̥or
    );
    res.status(500).json({ created: false });
  }
});

// o /api/categories/:id - PUT: Update a category by ID
router.put("/", (req, res) => {
  res.send("Update a category by ID");
});

// o /api/categories/:id - DELETE: Delete an category by ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM `categories` WHERE (`category_id` = ?);";
  try {
    const [rows, fields] = await makeQueryToDatabase(sql, [id]);
    if (rows.affectedRows > 0) res.status(202).json({ deleted: true });
  } catch (error) {
    res.status(500).json({ deleted: false });
  }
});

module.exports = router;
