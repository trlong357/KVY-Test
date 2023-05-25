const { MongoClient } = require("mongodb");
const { createCorpus } = require("./readCorpus");

const mongoUrl = "mongodb://localhost:27017";
const dbName = "search_corpus";
const collectionName = "corpus";

// Function to connect to the MongoDB server
async function connectToMongo() {
  const dbClient = new MongoClient(mongoUrl);
  await dbClient.connect();
  return dbClient;
}

// Function to initialize the search corpus collection in MongoDB
async function initializeCorpusCollection(dbClient) {
  try {
    const collectionExists = await checkCollectionExists(dbClient);
    if (collectionExists === false) {
      const db = dbClient.db(dbName);
      await db.createCollection(collectionName);
      const corpus = createCorpus(__dirname + "/../assets/hemingway.txt");
      await insertDocuments(dbClient, corpus);
      dbClient.close();
    }
  } catch (error) {
    console.log("Error when initializeCorpusCollection: ", error);
  }
}

// Function to check if a collection exists in a database
async function checkCollectionExists(dbClient) {
  const db = dbClient.db(dbName);
  const collections = await db.listCollections().toArray();
  const collectionNames = collections.map((collection) => collection.name);
  return collectionNames.includes(collectionName);
}

// Function to insert an array of strings as documents into a collection
async function insertDocuments(dbClient, documents) {
  const db = dbClient.db(dbName);
  const collection = db.collection(collectionName);
  console.log("Documents length: ", documents.length);

  const insertPromises = documents.map((document) =>
    collection.insertOne({ word: document })
  );

  await Promise.all(insertPromises);
  console.log(`${documents.length} documents inserted`);
}

// Function to load the search corpus from MongoDB
async function loadCorpus(dbClient) {
  const db = dbClient.db(dbName);
  const collection = db.collection(collectionName);
  const cursor = collection.find();
  const corpusSet = new Set();
  await cursor.forEach((doc) => corpusSet.add(doc.word));
  return Array.from(corpusSet);
}

// Function to add a word to the search corpus in MongoDB
async function addWordToCorpus(dbClient, word) {
  const db = dbClient.db(dbName);
  const collection = db.collection(collectionName);
  await collection.insertOne({ word });
}

// Function to search for a specific word in a collection
async function searchWord(dbClient, word) {
  const db = dbClient.db(dbName);
  const collection = db.collection(collectionName);

  const query = { word: { $eq: word } };
  const document = await collection.findOne(query);
  return document ? document.word : null;
}

// Function to remove a word from the search corpus in MongoDB
async function removeWordFromCorpus(dbClient, word) {
  const db = dbClient.db(dbName);
  const collection = db.collection(collectionName);
  await collection.deleteOne({ word });
}

module.exports = {
  mongoUrl,
  dbName,
  collectionName,
  initializeCorpusCollection,
  connectToMongo,
  loadCorpus,
  addWordToCorpus,
  removeWordFromCorpus,
  searchWord,
};
