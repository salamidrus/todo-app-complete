const multer = require("multer");

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'GA',
    format: async (req, file) => 'png', // supports promises as well,
  },
});


// ----------------------- FOR LOCAL DISK --------------------------------------

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniquePrefix + file.originalname);
//   },
// });

// -----------------------------------------------------------------------------

module.exports = multer({ storage: storage});
