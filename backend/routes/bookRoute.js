const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");

router.post("/addBook", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res
        .status(400)
        .json({ message: "Only admin is allowed to add book" });
    }
    const newBook = new Book({
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      category: req.body.category,
      language: req.body.language,
    });
    await newBook.save();
    res.status(200).json({ message: "Book added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.put("/updateBook", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.headers;

    await Book.findByIdAndUpdate(bookid, {
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      category: req.body.category,
      language: req.body.language,
    });
    res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});

router.delete("/deleteBook", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.headers;

    await Book.findByIdAndDelete(bookid);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});

router.get("/getAllBooks", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.json({ status: "Success", data: books });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});

router.get("/getRecentBooks", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(4);
    return res.json({ status: "Success", data: books });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});

router.get("/getBookById/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.json({ status: "Success", data: book });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});
module.exports = router;
