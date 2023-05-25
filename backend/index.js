const express = require("express");
const fs = require("fs");
const levenshtein = require("fast-levenshtein");
const cors = require("cors");

const searchRoute = require("./route/v1/search");
const bodyParser = require("body-parser");

const {
  initializeCorpusCollection,
  connectToMongo,
} = require("./utils/database");

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/v1/search", searchRoute);

// Init corpus collection
connectToMongo()
  .then((client) => initializeCorpusCollection(client))
  .catch((err) =>
    console.error("Failed to initialize corpus collection:", err)
  );
// -----
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
