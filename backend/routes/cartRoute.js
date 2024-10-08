const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

router.put("/addToCart", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;

    const userData = await User.findById(id);
    const isBookInCart = userData.cart.includes(bookid);
    if (isBookInCart) {
      res.status(200).json({ message: "This book is already added to cart" });
    }
    await User.findByIdAndUpdate(id, { $push: { cart: bookid } });
    res.status(200).json({ message: "Book added to cart" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//Remove from favorite
router.put(
  "/removeBookFromCart/:bookid",
  authenticateToken,
  async (req, res) => {
    try {
      const { bookid } = req.params;
      const { id } = req.headers;

      await User.findByIdAndUpdate(id, { $pull: { cart: bookid } });
      res.status(200).json({ message: "Book deleted from cart" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);
//Get cartItems
router.get("/getCartItems", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;

    const userData = await User.findById(id).populate("cart");
    const cartItems = userData.cart;
    return res.json({ status: "Success", data: cartItems });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});
module.exports = router;
