const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const makeQueryToDatabase = require("../modules/mysqlConnect");

// Admin API endpoints:

// ======== Route for logging in admin ======
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const userIP = req.ip;
  const unixTimestamp = Math.round(+new Date() / 1000);

  try {
    const selectStatement = `SELECT ${process.env.MYSQL_ADMINS_TABLE_NAME}.* FROM ${process.env.MYSQL_ADMINS_TABLE_NAME} WHERE ${process.env.MYSQL_ADMINS_TABLE_NAME}.email = ? LIMIT 1;`;
    const [rows, fields] = await makeQueryToDatabase(selectStatement, [email]);

    // check if user with this email exists
    if (rows.length < 1) return res.status(400).send("emailPasswordWrong");

    // check if password provided by user is correct or not
    const validPassword = await bcrypt.compare(password, rows[0].password);
    if (!validPassword) return res.status(400).send("passwordEmailWrong");

    //create JWT token
    const token = jwt.sign(
      {
        idusers: rows[0].admin_id,
        first_name: rows[0].first_name,
        last_name: rows[0].last_name,
        user_type: "super_admin",
      },
      process.env.JWT_PRIVATE_KEY
    );

    //TODO: update last seen and last login ip status in database

    // //since there's no error upto this point so send response with token
    res.header("x-auth-token", token).status(200).send("loggedIn");
  } catch (error) {
    console.log("the error is ", error);
    res.status(500).send("Problem in server!");
  }
});

module.exports = router;
