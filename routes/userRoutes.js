import express from "express";
import User from "../models/Users.js";
import jwt from "jsonwebtoken";

const app = express();
const router = express.Router();

// user route for the registration /api/users/register

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Create new user
    user = new User({ name, email, password });
    await user.save();

    // create JWT token
    const payload = {
      user: {
        id: user._id,
        role: user.role,
      },
    };
    //signing the token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
