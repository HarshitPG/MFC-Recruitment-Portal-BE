// const fileTypeCheck = (req, res, next) => {
//   const allowedTypes = ["application/pdf"];

//   if (!allowedTypes.includes(req.file.mimetype)) {
//     return res.status(400).json({ message: "Only PDF files are allowed" });
//   }

//   next();
// };

const fileCountLimit = (req, res, next) => {
  if (req.file.length > 1) {
    return res
      .status(400)
      .json({ message: "Only one file can be uploaded at a time" });
  }

  next();
};

const fileSizeLimit = (req, res, next) => {
  const fileSize = req.file.size;
  const maxSize = 200 * 1024;

  if (fileSize > maxSize) {
    return res
      .status(400)
      .json({ message: "File size exceeds the limit (200KB)" });
  }

  next();
};

module.exports = { fileSizeLimit, fileCountLimit };
