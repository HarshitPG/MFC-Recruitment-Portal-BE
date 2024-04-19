const express = require("express");
const {
  login,
  signUp,
  verifyOTP,
  resendOTP,
  requestPasswordReset,
  updatePassword,
} = require("../controllers/authController");
const { rateLimiter_10min_10req } = require("../middleware/ratelimiter");

const validateToken = require("../middleware/validateTokenHandler");
const app = express();

app.use(express.json());

const router = express.Router();

router.post("/signup", rateLimiter_10min_10req, signUp);
router.post("/login", rateLimiter_10min_10req, login);
router.post(
  "/verifyotp/:id",
  rateLimiter_10min_10req,
  validateToken,
  verifyOTP
);
router.post(
  "/resendotp/:id",
  rateLimiter_10min_10req,
  validateToken,
  resendOTP
);
router.post(
  "/requestPasswordReset",
  rateLimiter_10min_10req,
  requestPasswordReset
);
router.post("/updatepassword", rateLimiter_10min_10req, updatePassword);

module.exports = router;
