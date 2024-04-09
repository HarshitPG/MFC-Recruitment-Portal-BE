const express = require("express");
const { applicationStatus } = require("../controllers/statusController");
const validateToken = require("../middleware/validateTokenHandler");
const validateVerify = require("../middleware/validateVerify");
const app = express();

app.use(express.json());

const router = express.Router();

router.get("/status/:id", validateToken, validateVerify, applicationStatus);

module.exports = router;
