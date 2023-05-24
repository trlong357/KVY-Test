const express = require("express");
const fs = require("fs");

const router = express.Router();
const readCorpus = require("../../utils/readCorpus");
const { calculateSimilarity } = require("../../utils/similarityWords");

const corpusData = readCorpus.createCorpus(
  __dirname + "/../../assets/hemingway.txt"
);

router.post("/", (req, res, next) => {
  const queryWord = req.query.searchWord.toLowerCase();
  const similarWords = [];
  corpusData.forEach((word) => {
    const similarity = calculateSimilarity(queryWord, word);
    similarWords.push({ word, similarity });
  });
  similarWords.sort((a, b) => a.similarity - b.similarity);

  return res
    .status(200)
    .json({ mostSimilarityWords: similarWords.splice(0, 3) });
});

module.exports = router;
