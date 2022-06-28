const Router = require("express").Router();
const upload = require("../../middleware/upload");

// Upload Single Image
Router.post("/image", upload.uploadSingle, (req, res) => {
  res.send("sukses");
});

Router.post("/images", upload.uploadMultiple, (req, res) => {
  res.send("sukses");
});

Router.delete("/image", upload.deleteFile);

module.exports = Router;
