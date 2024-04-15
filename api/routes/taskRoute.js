const express = require("express");
const {
  uploadFileTech,
  uploadFile,
  downloadFileTech,
  uploadDesignTech,
  uploadTaskManagment,
  uploadTaskTech,
  uploadFileDesign,
  downloadFileDesign,
} = require("../controllers/taskController");
const { fileCountLimit, fileSizeLimit } = require("../middleware/validateFile");
const {
  validateTech,
  validateManagement,
  validateDesign,
} = require("../middleware/validateDomain");
const app = express();

app.use(express.json());

const router = express.Router();

// router.post(
//   "/techtask/:id",
//   validateTech,
//   uploadFile,
//   fileCountLimit,
//   fileSizeLimit,
//   uploadFileTech
// );
// router.get("/downloadtechtask/:id", validateTech, downloadFileTech);
// router.post(
//   "/designtask/:id",
//   validateDesign,
//   fileCountLimit,
//   fileSizeLimit,
//   uploadFile,
//   uploadFileDesign
// );
// router.get("/downloadtaskdesign/:id", validateDesign, downloadFileDesign);
router.post("/management/:id", validateManagement, uploadTaskManagment);
router.post("/tech/:id", validateTech, uploadTaskTech);
router.post("/design/:id", validateDesign, uploadDesignTech);

module.exports = router;
