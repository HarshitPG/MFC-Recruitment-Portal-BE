const express = require("express");
const {
  applicationStatus,
  applicationTechStatus,
  applicationDesignStatus,
  applicationManagementStatus,
} = require("../controllers/statusController");
const validateToken = require("../middleware/validateTokenHandler");
const { rateLimiter_10min_100req } = require("../middleware/ratelimiter");
const validateVerify = require("../middleware/validateVerify");
const app = express();

app.use(express.json());

const router = express.Router();

router.get(
  "/status/:id",
  rateLimiter_10min_100req,
  validateToken,
  validateVerify,
  applicationStatus
);
router.get(
  "/statustech/:id",
  rateLimiter_10min_100req,
  validateToken,
  validateVerify,
  applicationTechStatus
);
router.get(
  "/statusdesign/:id",
  rateLimiter_10min_100req,
  validateToken,
  validateVerify,
  applicationDesignStatus
);
router.get(
  "/statusmanagement/:id",
  rateLimiter_10min_100req,
  validateToken,
  validateVerify,
  applicationManagementStatus
);

module.exports = router;
