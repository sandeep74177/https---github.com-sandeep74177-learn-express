
const express = require("express");
const fs = require("fs");
const router = express.Router();
const mongodb = require("mongodb");

const db = require("../connection");
const collection = db.collection("bookstore");

router.get("/", async (req, res) => {
  try {
    const bookstore = await collection.find().toArray();
    res.json(bookstore);
  } catch (err) {
    res.status(500).json({ message: "Unable to fetch bookstore from the database." });
  }
});

router.get("/:id", getObjectId, async (req, res) => {
  try {
    const book = await collection.findOne({ _id: req.o_id });
    if (!book) {
      res.status(404).json({ message: "book not found." });
      return;
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: "Unable to fetch the book from the database." });
  }
});

router.post("/", getObjectId, async (req, res) => {
  try {
    const bookData = { ...req.body, _id: req.o_id };
    const result = await collection.insertOne(bookData);
    res.json({ message: "book added successfully.", book: result });
  } catch (err) {
    res.status(500).json({ message: "Unable to add the book to the database." });
  }
});

router.patch("/:id", getObjectId, async (req, res) => {
  try {
    const updateData = req.body;
    const result = await collection.updateOne(
      { _id: req.o_id },
      { $set: updateData }
    );
    if (result.matchedCount === 0) {
      res.status(404).json({ message: "book not found." });
      return;
    }
    res.json({ message: "book updated successfully." });
  } catch (err) {
    res.status(500).json({ message: "Unable to update the book in the database." });
  }
});

router.delete("/:id", getObjectId, async (req, res) => {
  try {
    const result = await collection.deleteOne({ _id: req.o_id });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: "book not found." });
      return;
    }
    res.json({ message: "book deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Unable to delete the book from the database." });
  }
});

// Middleware to convert `id` to MongoDB ObjectId
function getObjectId(req, res, next) {
  try {
    req.o_id = new mongodb.ObjectId(req.params.id || req.body.id);
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid ID format." });
  }
}

module.exports = router;
