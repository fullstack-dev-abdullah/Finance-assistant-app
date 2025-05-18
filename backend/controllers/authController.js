const User = require("../models/users");
const jwt = require("jsonwebtoken");

//generate jwt token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

//register user
const registerUser = async (req, res) => {
  const { name, email, password, profilePic } = req.body;

  //validate user input
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    //check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({
      name,
      email,
      password,
      profilePic,
    });

    res.status(201).json({
      _id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  //validate user input
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    //check if user exists
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res.status(200).json({
      _id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

//get user profile
const getUserProfile = async (req, res) => {
  const userId = req.user._id;

  try {
    //check if user exists
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

//export all functions
module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
