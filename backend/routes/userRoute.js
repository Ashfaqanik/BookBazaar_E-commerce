const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");

router.post("/signUp", async (req, res) => {
  try {
    const { username, email, password, phoneNumber, address } = req.body;

    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username length should be greater than 3" });
    }
    const existingUsername = await User.findOne({ username: "username" });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exist" });
    }
    const existingEmail = await User.findOne({ email: "email" });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exist" });
    }
    if (password.length <= 6) {
      return res.status(400).json({ message: "Password is too short" });
    }
    const hashPass = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      email: email,
      password: hashPass,
      phoneNumber: phoneNumber,
      address: address,
    });
    await newUser.save();
    res.status(200).json({ message: "Registered Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/signIn", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ message: "Username doesn't exist" });
    }
    await bcrypt.compare(password, existingUser.password, (err, data) => {
      if (data) {
        const authClaims = [
          { name: existingUser.username },
          { role: existingUser.role },
        ];
        const token = jwt.sign({ authClaims }, process.env.SECRET_KEY, {
          expiresIn: "30d",
        });
        res.status(200).json({
          id: existingUser._id,
          role: existingUser.role,
          token: token,
        });
      } else {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/getUserInformation", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const data = await User.findById(id).select("-password");
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/updateAddress", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;
    const data = await User.findByIdAndUpdate(id, { address: address });
    return res.status(200).json({ message: "Address updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
router.put("/updatePhoneNumber", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers; // To extract user ID from headers
    const { phoneNumber } = req.body; // To get phoneNumber from request body

    // Validate that phoneNumber is provided
    if (!phoneNumber || !/^[0-9]{10}$/.test(phoneNumber)) {
      return res.status(400).json({
        message:
          "Invalid phone number format. Please provide a valid 10-digit phone number.",
      });
    }

    // Find the user by ID and update the phone number
    const data = await User.findByIdAndUpdate(
      id,
      { phoneNumber: phoneNumber },
      { new: true, runValidators: true }
    );

    if (!data) {
      return res.status(404).json({ message: "User not found." });
    }

    return res
      .status(200)
      .json({ message: "Phone number updated successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
