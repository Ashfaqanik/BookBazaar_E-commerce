const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

//Add favorites
router.put("/addBookToFavorite", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;

    const userData = await User.findById(id);
    const isBookFavorite = userData.favorites.includes(bookid);
    if (isBookFavorite) {
      res.status(200).json({ message: "This book is already in favorites" });
    }
    await User.findByIdAndUpdate(id, { $push: { favorites: bookid } });
    res.status(200).json({ message: "Book added to favorites" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
//Remove from favorite
router.put("/removeBookFromFavorite", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;

    const userData = await User.findById(id);
    const isBookFavorite = userData.favorites.includes(bookid);
    if (isBookFavorite) {
      await User.findByIdAndUpdate(id, { $pull: { favorites: bookid } });
    }
    res.status(200).json({ message: "Book removed from favorites" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//Get favorites
router.get("/getFavorites", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;

    const userData = await User.findById(id).populate("favorites");
    const favoriteBooks = userData.favorites;
    return res.json({ status: "Success", data: favoriteBooks });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});
module.exports = router;
