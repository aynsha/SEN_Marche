const multer = require('multer');
const path= require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../uploads'); // Destination folder
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Keep original filename
    }
  });
  
  const upload = multer({ storage: storage });
  
  module.exports = upload;