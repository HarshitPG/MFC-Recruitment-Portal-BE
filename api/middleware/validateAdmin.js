const jwt = require("jsonwebtoken");

const validateVerify = async (req, res, next) => {
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

    const userAdmin = decoded.admin;
    console.log("userAdmin", userAdmin);

    if (userAdmin === false) {
      return res.status(403).json({ message: "User not admin" });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = validateVerify;
