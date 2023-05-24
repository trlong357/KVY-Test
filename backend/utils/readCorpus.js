const fs = require("fs");

const cleanWord = (word) => {
  return word.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
};

const createCorpus = (filePath) => {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const words = fileContent.split(/\s+/).map(cleanWord);

  const uniqueWords = new Set(words.filter(Boolean));

  const corpus = Array.from(uniqueWords);

  return corpus;
};

module.exports = { createCorpus };
