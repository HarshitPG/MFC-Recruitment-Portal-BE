const express = require("express");
const {
  UpdateUserDomain,
  UpdateUser,
  getuser,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
const validateVerify = require("../middleware/validateVerify");
const { rateLimiter_10min_10req } = require("../middleware/ratelimiter");
const app = express();

app.use(express.json());

const router = express.Router();

router.put(
  "/updateuser/:id",
  rateLimiter_10min_10req,
  validateToken,
  validateVerify,
  UpdateUser
);
router.put(
  "/updateuserdomain/:id",
  rateLimiter_10min_10req,
  validateToken,
  validateVerify,
  UpdateUserDomain
);
router.get("/user/:id", validateToken, validateVerify, getuser);
module.exports = router;
