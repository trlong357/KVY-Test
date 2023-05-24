const express = require("express");
const fs = require("fs");

const router = express.Router();
const readCorpus = require("../../utils/readCorpus");

const corpusData = readCorpus.createCorpus(
  __dirname + "/../../assets/hemingway.txt"
);

router.get("/", (req, res, next) => {
  console.log("search");
  return res.send(corpusData);
});

module.exports = router;
