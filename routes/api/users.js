import express from "express";
import { passwordStrength } from "check-password-strength";
import bcrypt from "bcrypt";
import User from "../../Models/user.js";
import login from "../../Models/login.js";
import jwt from "jsonwebtoken";
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", async (req, res) => {
  // Grabbing the password property from the req.body object
  const { password } = req.body;
  const strength = passwordStrength(password);

  if (strength.id <= 1) {
    return res.status(422).json({
      error: "Password does not meet the requirements.",
      requirements:
        "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.",
    });
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
      ...req.body,
      password: hashedPassword, // Override the password with the hashed password!
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET
    );
    res.setHeader("x-auth-token", token);

    res.status(201).json({
      email: newUser.email,
      id: newUser._id,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(422).json(error.errors);
    }
    return res.status(500).send();
  }
});

router.post("/login", async (req, res) => {
  // Validate the payload from the post

  try {
    await login.validate(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(404).send();
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect password!",
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET
    );

    res.setHeader("x-auth-token", token);

    res.status(200).json({
      message: "Login successful!",
      email: user.email,
      id: user._id,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(422).json(error.errors);
    }
    return res.status(500).send();
  }
});

router.post("/logout", (req, res) => {
  // clear the httpOnly jwt cookie
  res.clearCookie("jwt");
  res.status(204).send();
});

export default router;
