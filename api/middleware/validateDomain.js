const jwt = require("jsonwebtoken");
// const userModel = require("../models/userModel");

const validateTech = async (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ message: "User is not authorized or token missing" });
    }

    token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECERT);
    const user = decoded;
    console.log("decoded", decoded);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("user", user);
    const userSubdomain = user.domain;
    const userVerified = user.verified;

    if (userVerified && userSubdomain.includes("tech")) {
      return next();
    } else {
      return res
        .status(403)
        .json({ message: "User not verified for this route or choose domain" });
    }
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
    const user = decoded;
    console.log("decoded", decoded);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("user", user);
    const userVerified = user.verified;
    const userSubdomain = user.domain;

    if (userVerified && userSubdomain.includes("design")) {
      return next();
    } else {
      return res
        .status(403)
        .json({ message: "User not verified for this route or choose domain" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const validateManagement = async (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ message: "User is not authorized or token missing" });
    }

    token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECERT);
    const user = decoded;
    console.log("decoded", decoded);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("user", user);
    const userSubdomain = user.domain;
    const userVerified = user.verified;

    if (userVerified && userSubdomain.includes("management")) {
      return next();
    } else {
      return res
        .status(403)
        .json({ message: "User not verified for this route or choose domain" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { validateTech, validateManagement, validateDesign };
