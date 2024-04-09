const express = require("express");
const {
  login,
  signUp,
  verifyOTP,
  resendOTP,
} = require("../controllers/authController");
const validateToken = require("../middleware/validateTokenHandler");
const app = express();

app.use(express.json());

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/verifyotp/:id", validateToken, verifyOTP);
router.post("/resendotp/:id", validateToken, resendOTP);

module.exports = router;
