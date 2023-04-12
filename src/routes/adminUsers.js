const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// Admin API endpoints:

// ======== Route for logging in admin ======
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userIP = req.ip;
  const unixTimestamp = Math.round(+new Date() / 1000);

  try {
    const selectStatement = `SELECT ${usersTable}.* FROM ${usersTable} WHERE ${usersTable}.email = ? LIMIT 1;`;
    const queryResponse = await makeQueryToDatabase(selectStatement, [email]);

    // check if user with this email exists
    if (!queryResponse[0][0]) return res.status(400).send("emailPasswordWrong");

    // check if password provided by user is correct or not
    const validPassword = await bcrypt.compare(
      password,
      queryResponse[0][0].password
    );
    if (!validPassword) return res.status(400).send("passwordEmailWrong");

    //create JWT token
    const token = jwt.sign(
      {
        idusers: queryResponse[0][0].idusers,
        first_name: queryResponse[0][0].first_name,
        last_name: queryResponse[0][0].last_name,
        user_type: "super_git admin",
      },
      process.env.JWT_PRIVATE_KEY
    );

    //TODO: update last seen and last login ip status in database

    //TODO: if rMe is true then remember this user on this device so that she doesn't need to login again and again

    //since there's no error upto this point so send response with token
    res.header("x-auth-token", token).status(200).send("loggedIn");
  } catch (error) {
    console.log("the error is ", error);
    res.status(500).send("Problem in server!");
  }
});

module.exports = router;
