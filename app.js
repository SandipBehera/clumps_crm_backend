const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
let PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

const userController = require("./controller/userController");
const companyController = require("./controller/companyController");

app.post("/login", userController.login);
app.post("/register", userController.register);
app.put("/passwordUpdate/:id", userController.updateUserPassword);
app.post("/client/onboard", companyController.Onboard);
app.get("/client/type", companyController.getCompanyType);

process.env.NODE_ENV === "production"
  ? (PORT = process.env.PROD_PORT)
  : (PORT = process.env.DEV_PORT);

app.listen(PORT, () => {
  console.log(`App running on ${process.env.NODE_ENV} port ${PORT}.`);
});
