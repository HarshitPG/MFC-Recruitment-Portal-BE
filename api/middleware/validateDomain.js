const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const User = require("../models/User"); // Import the User model

const validateTech = async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ message: "User is not authorized or token missing" });
  }

  token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECERT);
    const userId = decoded.id;
    const user = await User.findById(userId);
    console.log("user", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userSubdomain = user.domain;
    const userVerified = user.verified;

    if (
      userVerified === true &&
      userSubdomain &&
      userSubdomain.includes("tech")
    ) {
      return next();
    }
    return res
      .status(403)
      .json({ message: "User not verified for this route or choose domain" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const validateDesign = async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ message: "User is not authorized or token missing" });
  }

  token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECERT);
    const userId = decoded.id;
    const user = await User.findById(userId);
    console.log("user", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userSubdomain = user.domain;
    const userVerified = user.verified;

    if (
      userVerified === true &&
      userSubdomain &&
      userSubdomain.includes("design")
    ) {
      return next();
    }
    return res
      .status(403)
      .json({ message: "User not verified for this route or choose domain" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const validateManagement = async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ message: "User is not authorized or token missing" });
  }

  token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECERT);
    const userId = decoded.id;
    const user = await User.findById(userId);
    console.log("user", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userSubdomain = user.domain;
    const userVerified = user.verified;
    if (
      userVerified === true &&
      userSubdomain &&
      userSubdomain.includes("management")
    ) {
      return next();
    }
    return res
      .status(403)
      .json({ message: "User not verified for this route or choose domain" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { validateTech, validateManagement, validateDesign };
