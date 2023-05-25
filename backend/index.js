const express = require("express");
const cors = require("cors");

const searchRoute = require("./route/v1/search");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/v1/search", searchRoute);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
