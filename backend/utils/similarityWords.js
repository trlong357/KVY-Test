const levenshtein = require("fast-levenshtein");

const calculateSimilarity = (searchWord, word) => {
  return levenshtein.get(searchWord, word);
};

const findSimilarWord = (word, corpusData) => {
  const searchWord = word.toLowerCase();
  const similarWords = [];
  corpusData.forEach((corpusWord) => {
    const similarity = calculateSimilarity(searchWord, corpusWord);
    similarWords.push({ word: corpusWord, score: similarity });
  });

  // score càng thấp thì càng giống với từ cần tìm
  similarWords.sort((a, b) => a.score - b.score);
  return similarWords;
};

module.exports = { calculateSimilarity, findSimilarWord };
