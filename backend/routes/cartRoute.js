const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

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

router.post("/create-checkout-session", async (req, res) => {
  const { products } = req.body;

  try {
    const lineItems = products.map((product) => {
      if (!product.title || !product.price || !product.url) {
        throw new Error("Product must have title, price, and url.");
      }

      return {
        price_data: {
          currency: "aud",
          product_data: {
            name: product.title,
            images: [product.url],
          },
          unit_amount: Math.round(product.price * 100), // Convert to cents
        },
        quantity: 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "https://bookbazaar-e-commerce.onrender.com/success",
      cancel_url: "https://bookbazaar-e-commerce.onrender.com/cancelled",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
