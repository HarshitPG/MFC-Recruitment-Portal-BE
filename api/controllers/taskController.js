const multer = require("multer");
const TechTaskModel = require("../models/techTaskModel");
const ManagmentTaskModel = require("../models/managementModel");
const DesignTaskModel = require("../models/designTaskModel");

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// const uploadFile = upload.single("file");

// const uploadFileTech = async (req, res) => {
//   const { id } = req.params;
//   const { subdomain } = req.body;

//   if (!req.file) {
//     return res.status(400).json({ message: "No file uploaded" });
//   }

//   try {
//     const user = await TechTaskModel.findOne({
//       user_id: id,
//     });

//     if (!user) {
//       const newFile = new TechTaskModel({
//         user_id: id,
//         file: {
//           data: req.file.buffer,
//           contentType: req.file.mimetype,
//         },
//         subdomain: subdomain,
//         isDone: true,
//       });
//       const savedFile = await newFile.save();

//       res.json({ file: savedFile });
//     }
//     if (user.isDone === true) {
//       return res.status(200).json({ message: "Already file submitted" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const uploadFileDesign = async (req, res) => {
//   const { id } = req.params;
//   const { subdomain } = req.body;

//   if (!req.file) {
//     return res.status(400).json({ message: "No file uploaded" });
//   }
//   try {
//     const user = await DesignTaskModel.findOne({
//       user_id: id,
//     });
//     if (!user) {
//       const newFile = new DesignTaskModel({
//         user_id: id,
//         file: {
//           data: req.file.buffer,
//           contentType: req.file.mimetype,
//         },

//         subdomain: subdomain,
//         isDone: true,
//       });
//     }

//     if (user.isDone) {
//       return res.status(200).json({ message: "Already file submitted" });
//     }

//     const savedFile = await newFile.save();

//     res.json({ file: savedFile });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const downloadFileTech = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const file = await TechTaskModel.findOne({ user_id: id });

//     if (!file) {
//       return res.status(404).json({ message: "File not found" });
//     }

//     res.set("Content-Disposition", `attachment; filename="${file.email}"`);
//     res.set("Content-Type", file.file.contentType);
//     res.send(file.file.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to download file" });
//   }
// };

// const downloadFileDesign = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const file = await DesignTaskModel.findOne({ user_id: id });

//     if (!file) {
//       return res.status(404).json({ message: "File not found" });
//     }

//     res.set("Content-Disposition", `attachment; filename="${file.email}"`);
//     res.set("Content-Type", file.file.contentType);
//     res.send(file.file.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to download file" });
//   }
// };

const uploadTaskManagment = async (req, res) => {
  const { id } = req.params;
  const {
    question1,
    question2,
    question3,
    question4,
    question5,
    question6,
    question7,
    question8,
    subdomain,
  } = req.body;
  try {
    const user = await ManagmentTaskModel.findOne({
      user_id: id,
    });

    if (user.isDone === true) {
      return res.status(200).json({ message: "Already file submitted" });
    }

    const task = new ManagmentTaskModel({
      user_id: id,
      question1: question1,
      question2: question2,
      question3: question3,
      question4: question4,
      question5: question5,
      question6: question6,
      question7: question7,
      question8: question8,
      subdomain: subdomain,
      isDone: true,
    });
    const savedTask = await task.save();

    res.json({ savedTask });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const uploadTaskTech = async (req, res) => {
  const { id } = req.params;
  const { question1, question2, question3, subdomain } = req.body;
  try {
    const user = await TechTaskModel.findOne({
      user_id: id,
    });

    if (user.isDone === true) {
      return res.status(200).json({ message: "Already file submitted" });
    }

    const task = new TechTaskModel({
      user_id: id,
      question1: question1,
      question2: question2,
      question3: question3,
      subdomain: subdomain,
      isDone: true,
    });
    const savedTask = await task.save();

    res.json({ savedTask });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const uploadDesignTech = async (req, res) => {
  const { id } = req.params;
  const { question1, question2, question3, subdomain } = req.body;
  try {
    const user = await DesignTaskModel.findOne({
      user_id: id,
    });

    if (user.isDone === true) {
      return res.status(200).json({ message: "Already file submitted" });
    }

    const task = new DesignTaskModel({
      user_id: id,
      question1: question1,
      question2: question2,
      question3: question3,
      subdomain: subdomain,
      isDone: true,
    });
    const savedTask = await task.save();

    res.json({ savedTask });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  uploadDesignTech,
  uploadTaskManagment,
  uploadTaskTech,
};
