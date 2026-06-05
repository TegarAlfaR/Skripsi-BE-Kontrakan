const multer = require("multer");

const multerFilter = (req, file, callback) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    callback(null, true);
  } else {
    throw new Error("Only .png, .jpg and .jpeg format allowed!");
  }
};

const upload = multer({
  fileFilter: multerFilter,
});

module.exports = upload;
