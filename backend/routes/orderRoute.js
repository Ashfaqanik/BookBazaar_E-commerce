const router = require("express").Router();
const Book = require("../models/book");
const Order = require("../models/order");
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

//placing order
router.post("/placeOrder", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;

    for (const orderData of order) {
      const newOrder = new Order({ user: id, book: orderData._id });
      const orderDataFromDb = await newOrder.save();
      //saving order in user model
      await User.findByIdAndUpdate(id, {
        $push: { orders: orderDataFromDb._id },
      });

      // Removing ordered items from the User's cart using book IDs
      const orderedBookIds = order.map((item) => item._id); // Extract book IDs from the order
      await User.findByIdAndUpdate(id, {
        $pull: { cart: { $in: orderedBookIds } },
      });
    }

    res.json({
      status: "Success",
      message: "Order placed successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});

router.get("/getOrderHistory", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;

    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book" },
    });

    const orderData = userData.orders.reverse();
    res.json({
      status: "Success",
      data: orderData,
    });
  } catch (error) {
    // res.status(500).json({ message: "An error occurred" });
    res.json(error.message);
  }
});

router.get("/getAllOrders", authenticateToken, async (req, res) => {
  try {
    const userData = await Order.find()
      .populate({
        path: "book", // Populate book details
      })
      .populate({
        path: "user", // Populate user details
      })
      .sort({ createdAt: -1 });

    res.json({
      status: "Success",
      data: userData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/updatePaymentStatus/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    await Order.findByIdAndUpdate(id, { payment: req.body.status });
    res.json({
      status: "Success",
      data: "Status updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});

//Updating order --admin
router.put("/updateOrderStatus/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    await Order.findByIdAndUpdate(id, { status: req.body.status });
    res.json({
      status: "Success",
      data: "Status updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});
module.exports = router;
