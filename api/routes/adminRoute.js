const express = require("express");
const {
  getAllUser,
  updateUserStatus,
  makeAdmin,
  deleteUser,
} = require("../controllers/adminController");
const isAdmin = require("../middleware/validateAdmin");
const validateToken = require("../middleware/validateTokenHandler");
const validateVerify = require("../middleware/validateVerify");
const app = express();

app.use(express.json());

const router = express.Router();

router.get("/users/:id", validateToken, validateVerify, isAdmin, getAllUser);
router.put(
  "/updatestatus/:id",
  validateToken,
  validateVerify,
  isAdmin,
  updateUserStatus
);
router.put(
  "/updatestatusadmin",
  validateToken,
  validateVerify,
  isAdmin,
  makeAdmin
);

router.delete("/email/fox", validateToken, validateVerify, isAdmin, deleteUser);

module.exports = router;
