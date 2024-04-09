const express = require("express");
const {
  UpdateUserDomain,
  UpdateUser,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
const validateVerify = require("../middleware/validateVerify");
const app = express();

app.use(express.json());

const router = express.Router();

router.put("/updateuser/:id", validateToken, validateVerify, UpdateUser);
router.put(
  "/updateuserdomain/:id",
  validateToken,
  validateVerify,
  UpdateUserDomain
);

module.exports = router;
