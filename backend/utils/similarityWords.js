const levenshtein = require("fast-levenshtein");

const calculateSimilarity = (searchWord, word) => {
  return levenshtein.get(searchWord, word);
};

module.exports = { calculateSimilarity };
