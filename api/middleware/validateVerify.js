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

    console.log("decoded", decoded);

    const userVerified = decoded.verified;

    if (userVerified === false) {
      return res.status(403).json({ message: "User not verified" });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = validateVerify;
