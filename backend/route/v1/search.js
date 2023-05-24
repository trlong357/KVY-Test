const express = require("express");
const fs = require("fs");

const router = express.Router();
const readCorpus = require("../../utils/readCorpus");
const { calculateSimilarity } = require("../../utils/similarityWords");

const corpusData = readCorpus.createCorpus(
  __dirname + "/../../assets/hemingway.txt"
);

router.post("/", (req, res, next) => {
  const queryWord = req.body.searchWord.toLowerCase();
  const similarWords = [];
  corpusData.forEach((word) => {
    const similarity = calculateSimilarity(queryWord, word);
    similarWords.push({ word, score: similarity });
  });

  // score càng thấp thì càng giống với từ cần tìm
  similarWords.sort((a, b) => a.score - b.score);
  console.log(corpusData.length);

  return res
    .status(200)
    .json({ mostSimilarityWords: similarWords.splice(0, 3) });
});

router.delete("/", (req, res, next) => {
  const deletedWord = req.body.deletedWord.toLowerCase();
  const similarWords = [];
  corpusData.forEach((word) => {
    const similarity = calculateSimilarity(deletedWord, word);
    similarWords.push({ word, score: similarity });
  });

  // score càng thấp thì càng giống với từ cần tìm
  similarWords.sort((a, b) => a.score - b.score);

  const theMostSimilarityWord = similarWords[0];
  console.log(similarWords);
  console.log(theMostSimilarityWord);

  const indexOfMostSimilarityWord = corpusData.indexOf(
    theMostSimilarityWord.word
  );
  corpusData.splice(indexOfMostSimilarityWord, 1);
  console.log(corpusData.length);
  console.log("---");
  return res.status(200).json(theMostSimilarityWord);
});

module.exports = router;
