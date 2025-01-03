const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
// const mongodb = require("mongodb");
require("./mongoose");
const db = require("./connection");
const collection = db.collection("students");
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
const app = express();
app.use(express.json());

// app.use(logger);

app.get("/", async (req, res) => {
  console.log(req.query);
  const cursor = collection.find();
  const results = await cursor.toArray();
  res.json(results);
});

//import student middleware
const studentRouter = require("./routes/students");
app.use("/students", studentRouter);

// function logger(req, res, next) {
//   console.log(req.method);
//   console.log(req.url);
//   next();
// }

app.listen(PORT);
