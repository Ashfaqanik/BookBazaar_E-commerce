const router = require("express").Router();
const Book = require("../models/book");
const Order = require("../models/order");
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

//place order
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
      //Clear cart
      await User.findByIdAndUpdate(id, {
        $pull: { cart: orderDataFromDb._id },
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
      populate: { path: "books" },
    });

    const orderData = userData.orders.reverse();
    res.json({
      status: "Success",
      data: orderData,
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});

router.get("/getAllOrders", authenticateToken, async (req, res) => {
  try {
    const userData = await Order.find
      .populate({
        path: "books",
      })
      .populate({
        path: "books",
      })
      .sort({ createdAt: -1 });

    res.json({
      status: "Success",
      data: userData,
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});

//Update order --admin
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
