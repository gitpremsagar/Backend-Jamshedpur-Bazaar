require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

// route handlers
const productsRouteHandler = require("./src/routes/productsHandler");
const ordersRouteHandler = require("./src/routes/ordersHandler");
const customersRouteHandler = require("./src/routes/customersHandler");
const adminUsersHandler = require("./src/routes/adminUsers");

// categories route handlers
const topCategoriesHandler = require("./src/routes/categories-management/topCategoriesHandler");
const categoriesHandler = require("./src/routes/categories-management/categoriesHandler");

app.use(express.json());
app.use(cors());
const corsOptions = { exposedHeaders: "x-auth-token" };
app.use(cors(corsOptions));

// assigning route handler
app.use("/api/products", productsRouteHandler);
app.use("/api/orders", ordersRouteHandler);
app.use("/api/customers", customersRouteHandler);
app.use("/api/admin", adminUsersHandler);

// categories routes
app.use("/api/top-categories", topCategoriesHandler);
app.use("/api/categories", categoriesHandler);

const port = process.env.PORT || process.env.PORT_ON_LOCALHOST;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
