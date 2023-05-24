const express = require("express");
const fs = require("fs");
const searchRoute = require("./route/v1/search");

const app = express();

app.use("/search", searchRoute);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
