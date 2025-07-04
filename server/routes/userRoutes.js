const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");


// Register a new user
router.post("/register", async (req, res) => {
  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      return res.send({
        success: false,
        message: "User already exists!",
      });
    }

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashedPassword;

    const newUser = new User(req.body);
    await newUser.save();

    res.send({
      success: true,
      message: "User registered successfully!",
    });

  } catch (err) {
    console.error("Registration error:", err);
    res.send({
      success: false,
      message: "Something went wrong during registration."
    });
  }
});


// Login an existing user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.send({
        success: false,
        message: "User does not exist. Please register first.",
      });
    }

    // Validate password
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
      return res.status(401).send({
        success: false,
        message: "Invalid password entered!",
      });
    }

    const jwtToken = jwt.sign({ userId: user._id }, "scaler_movies", {
      expiresIn: "2d",
    });

    res.send({
      success: true,
      message: "Login successful!",
      token: jwtToken,
    });

  } catch (error) {
    console.error("Login error:", error);
    res.send({
      success: false,
      message: "Something went wrong during login."
    });
  }
});


// Get currently authenticated user
router.get("/get-valid-user", authMiddleware, async (req, res) => {
  try {
    const validUser = await User.findById(req.body.userId).select("-password");

    res.send({
      success: true,
      message: "Authorized user fetched successfully!",
      data: validUser,
    });

  } catch (error) {
    console.error("Fetch user error:", error);
    res.send({
      success: false,
      message: "Failed to fetch user."
    });
  }
});

module.exports = router;
