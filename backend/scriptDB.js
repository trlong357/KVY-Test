const {
  initializeCorpusCollection,
  connectToMongo,
} = require("./utils/database");

connectToMongo()
  .then((client) => initializeCorpusCollection(client))
  .catch((err) =>
    console.error("Failed to initialize corpus collection:", err)
  );
