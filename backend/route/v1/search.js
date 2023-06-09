const express = require("express");

const router = express.Router();
const { findSimilarWord } = require("../../utils/similarityWords");
const {
  loadCorpus,
  connectToMongo,
  searchWord,
  addWordToCorpus,
  removeWordFromCorpus,
} = require("../../utils/database");

router.get("/", async (req, res) => {
  try {
    if (req.query.searchWord == null || req.query.searchWord == "") {
      return res.status(400).json({ msg: "Nhập từ cần tìm" });
    }
    const dbClient = await connectToMongo();
    const corpusData = await loadCorpus(dbClient);
    const queryWord = req.query.searchWord.toLowerCase();
    const similarWords = findSimilarWord(queryWord, corpusData);
    dbClient.close();
    return res
      .status(200)
      .json({ mostSimilarityWords: similarWords.splice(0, 3) });
  } catch (error) {
    return res.status(400).json({ msg: `Đã có lỗi xảy ra: ${error}` });
  }
});

router.post("/", async (req, res) => {
  try {
    if (req.body.addedWord == null) {
      return res.status(400).json({ msg: "Nhập từ cần thêm" });
    }
    const addedWord = req.body.addedWord.trim().toLowerCase();
    const addedWordArray = addedWord.split(" ");
    if (addedWordArray.length > 1) {
      return res.status(400).json({ msg: "Chỉ nhập 1 từ" });
    } else {
      const dbClient = await connectToMongo();
      const checkExistWord = await searchWord(dbClient, addedWord);
      if (checkExistWord === null) {
        await addWordToCorpus(dbClient, addedWord);
        dbClient.close();
        return res.status(200).json({ msg: "Đã lưu thành công" });
      } else {
        dbClient.close();
        return res
          .status(400)
          .json({ msg: `Đã tồn tại từ ${req.body.addedWord}` });
      }
    }
  } catch (error) {
    return res.status(400).json({ msg: `Đã có lỗi xảy ra: ${error}` });
  }
});

router.delete("/", async (req, res) => {
  try {
    if (req.query.deletedWord == null || req.query.deletedWord == "") {
      return res.status(400).json({ msg: "Nhập từ cần xoá" });
    }
    const deletedWord = req.query.deletedWord.trim().toLowerCase();
    const deleteWordArray = deletedWord.split(" ");
    if (deleteWordArray.length > 1) {
      return res.status(400).json({ msg: "Chỉ nhập 1 từ" });
    } else {
      const dbClient = await connectToMongo();
      const corpusData = await loadCorpus(dbClient);
      const similarWords = findSimilarWord(deletedWord, corpusData);

      const theMostSimilarityWord = similarWords[0];

      await removeWordFromCorpus(dbClient, theMostSimilarityWord.word);
      dbClient.close();
      return res.status(200).json({ msg: "Đã xoá thành công" });
    }
  } catch (error) {
    return res.status(400).json({ msg: `Đã có lỗi xảy ra: ${error}` });
  }
});

module.exports = router;
