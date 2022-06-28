const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
const multerUtils = require("../multer");
const multer = require("multer");

const uploadSingle = (req, res, next) => {
  const uploadSingle = multerUtils.single("image");

  uploadSingle(req, res, (err) => {
    try {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        res.status(400).send(err?.message ?? "Something went wrong!");
        return;
      } else if (err) {
        // An unknown error occurred when uploading.
        res.status(400).send(err ?? "Something went wrong!");
        return;
      }

      next();
    } catch (error) {
      res.status(500).send(error?.message ?? "Upload Failed");
    }
  });
};

const uploadMultiple = (req, res, next) => {
  const uploadSingle = multerUtils.array("images", 5);

  uploadSingle(req, res, (err) => {
    try {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        res.status(400).send(err?.message ?? "Something went wrong!");
        return;
      } else if (err) {
        // An unknown error occurred when uploading.
        res.status(400).send(err ?? "Something went wrong!");
        return;
      }

      next();
      // if (err) throw err;
    } catch (error) {
      res.status(500).send(error?.message ?? "Upload Failed");
    }
  });
};

const deleteFile = async (req, res) => {
  await unlinkAsync(`images/${req.body.name}`);
  res.send("DELETE COMPLETED!");
};

module.exports = { deleteFile, uploadMultiple, uploadSingle };
