const mongodb = require("mongodb");
const MONGO_URI = process.env.MONGO_URI;

const client = new mongodb.MongoClient(MONGO_URI);
client
  .connect()
  .then(() => console.log("Connect to the DB"))
  .catch((err) => console.error(err));

const db = client.db("test");

module.exports = db;
