const multer = require("multer");
const uuid = require("uuid").v4;
const appRoot = require("app-root-path");
const storage = multer.diskStorage({
  destination: appRoot + "/public/uploads",
  filename: function (_req, file, cb) {
    cb(null, uuid() + "-" + file.originalname);
  },
});
var uploadSingle = multer({
  storage: storage,
  fileFilter: function (_req, file, cb) {
    checkFileType(file, cb);
  },
}).single("image");
var uploadArray = multer({
  storage: storage,
  fileFilter: function (_req, file, cb) {
    checkFileType(file, cb);
  },
}).array("images");

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|svg/;
  // Check ext
  const extname = filetypes.test(file.originalname);
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("I don't have a clue!"));
  }
}
module.exports.upload = { uploadArray, uploadSingle };
