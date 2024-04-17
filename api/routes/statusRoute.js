const express = require("express");
const {
  applicationStatus,
  applicationTechStatus,
  applicationDesignStatus,
  applicationManagementStatus,
} = require("../controllers/statusController");
const validateToken = require("../middleware/validateTokenHandler");
const validateVerify = require("../middleware/validateVerify");
const app = express();

app.use(express.json());

const router = express.Router();

router.get("/status/:id", validateToken, validateVerify, applicationStatus);
router.get(
  "/statustech/:id",
  validateToken,
  validateVerify,
  applicationTechStatus
);
router.get(
  "/statusdesign/:id",
  validateToken,
  validateVerify,
  applicationDesignStatus
);
router.get(
  "/statusmanagement/:id",
  validateToken,
  validateVerify,
  applicationManagementStatus
);

module.exports = router;
