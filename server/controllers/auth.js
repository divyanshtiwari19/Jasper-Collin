const { validationResult } = require("express-validator");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { comparePassword } = require("../utils/utils");

exports.register = async (req, res) => {
  try {
    const { firstname, lastname, username, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "Username already in use, try different one" });

    const newUser = new User({
      firstname,
      lastname,
      username,
      password,
      status: true,
    }); // **** password hashed in inside model ***
    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        username: newUser.username,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Something Broke!" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Find user by email
    const user = await User.findOne({ username }).select("+password");

    if (!user)
      return res.status(401).json({ message: "Invalid username or password" });
    console.log(user, "user?.status");
    if (!user?.status)
      return res
        .status(403)
        .json({ message: "Account is inactive. Contact support." });

    const isMatch = await comparePassword(password, user?.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // token saved in mongo session - using express session
    req.session.token = token;

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Something Broke!" });
  }
};

exports.logout = async (req, res) => {
  try {
    req.session.destroy(() => {
      res
        .clearCookie("connect.sid", { path: "/" })
        .status(200)
        .send({ message: "Logout Successfully" });
    });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Something Broke!" });
  }
};
