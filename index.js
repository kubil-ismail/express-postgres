const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

const userRoutes = require("./routes/users/searchUsersRoutes");
const userDetailRoutes = require("./routes/users/usersRoutes");
const authRoutes = require("./routes/auth/index");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${Date.now()}_${Math.random()}_${uuidv4()}_${path.extname(
        file.originalname
      )}`
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000, // 1MB
  },
  fileFilter: fileFilter,
});

function fileFilter(req, file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png/;

  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

// request = input
// response = output
app.use(helmet());

// use cors for all
var allowlist = ["https://www.bca.co.id", "https://blubybcadigital.id"];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

// app.use(cors());

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Define all routes
app.use("/images", express.static("images"));
app.use("/", cors(corsOptionsDelegate), userRoutes);
app.use("/", cors(corsOptionsDelegate), userDetailRoutes);
app.use("/", cors(corsOptionsDelegate), authRoutes);

// Upload Single Image
app.post("/image", (req, res) => {
  const uploadSingle = upload.single("image");

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

      res.send(`http://localhost:8000/${req.file?.path}`);
    } catch (error) {
      res.status(500).send(error?.message ?? "Upload Failed");
    }
  });
});

app.post("/images", (req, res) => {
  const uploadSingle = upload.array("images", 5);

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

      res.send(req.files);
      // if (err) throw err;
    } catch (error) {
      res.status(500).send(error?.message ?? "Upload Failed");
    }
  });
});

app.delete("/image", async (req, res) => {
  await unlinkAsync(`images/${req.body.name}`);
  res.send("DELETE COMPLETED!");
});

// end of bottom code
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
