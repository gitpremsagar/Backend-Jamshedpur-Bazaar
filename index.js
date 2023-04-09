require("dotenv").config();
const express = require("express");
const app = express();

// route handlers
const productsRouteHandler = require("./src/routes/productsHandler");

app.use("/api/products", productsRouteHandler);

app.get("/", (req, res) => {
  res.send("The server is running!");
});

const port = process.env.PORT || process.env.PORT_ON_LOCALHOST;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
