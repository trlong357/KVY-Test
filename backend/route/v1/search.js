const express = require("express");
const fs = require("fs");

const router = express.Router();
const readCorpus = require("../../utils/readCorpus");
const { findSimilarWord } = require("../../utils/similarityWords");

const corpusData = readCorpus.createCorpus(
  __dirname + "/../../assets/hemingway.txt"
);

router.get("/", (req, res) => {
  try {
    if (req.query.searchWord == null) {
      return res.status(400).json({ msg: "Nhập từ cần tìm" });
    }
    const queryWord = req.query.searchWord.toLowerCase();
    const similarWords = findSimilarWord(queryWord, corpusData);

    return res
      .status(200)
      .json({ mostSimilarityWords: similarWords.splice(0, 3) });
  } catch (error) {
    return res.status(400).json({ msg: `Đã có lỗi xảy ra: ${error}` });
  }
});

router.post("/", (req, res) => {
  try {
    if (req.body.addedWord == null) {
      return res.status(400).json({ msg: "Nhập từ cần thêm" });
    }
    const addedWord = req.body.addedWord.trim().toLowerCase();
    const addedWordArray = addedWord.split(" ");
    if (addedWordArray.length > 0) {
      return res.status(400).json({ msg: "Chỉ nhập 1 từ" });
    } else {
      const indexOfAddedWord = corpusData.indexOf(addedWord);
      if (indexOfAddedWord === -1) {
        corpusData.push(addedWord);
        return res.status(200).json({ msg: "Đã lưu thành công" });
      } else {
        return res
          .status(204)
          .json({ msg: `Đã tồn tại từ ${req.body.addedWord}` });
      }
    }
  } catch (error) {
    return res.status(400).json({ msg: `Đã có lỗi xảy ra: ${error}` });
  }
});

router.delete("/", (req, res) => {
  try {
    if (req.body.deletedWord == null) {
      return res.status(400).json({ msg: "Nhập từ cần xoá" });
    }
    const deletedWord = req.body.deletedWord.trim().toLowerCase();
    const deleteWordArray = deletedWord.split(" ");
    if (deleteWordArray.length > 0) {
      return res.status(400).json({ msg: "Chỉ nhập 1 từ" });
    } else {
      const similarWords = findSimilarWord(deletedWord, corpusData);

      const theMostSimilarityWord = similarWords[0];

      const indexOfMostSimilarityWord = corpusData.indexOf(
        theMostSimilarityWord.word
      );
      corpusData.splice(indexOfMostSimilarityWord, 1);

      return res.status(200).json({ msg: "Đã xoá thành công" });
    }
  } catch (error) {
    return res.status(400).json({ msg: `Đã có lỗi xảy ra: ${error}` });
  }
});

module.exports = router;
