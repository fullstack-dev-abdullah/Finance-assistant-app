const multer = require("multer");

// Set up storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Set up file filter
const fileFilter = (req, file, cb) => {
  // Accept images only
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type, only JPEG, PNG, JPG and GIF are allowed!"),
      false
    );
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
