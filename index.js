const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const helmet = require("helmet");

// request = input
// response = output
app.use(helmet());

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

let profile = [
 
];

// GET PROFILE
app.get("/profile", (req, res) => {
  res.send(profile);
});

// POST PROFILE
app.post("/profile/add", (req, res) => {
  const { nama, umur, pekerjaan, hobby, id } = req.body;

  const isValid = nama && umur && pekerjaan && hobby;

  if (isValid) {
    profile.push({
      id: parseInt(id),
      nama,
      umur,
      pekerjaan,
      hobby,
    });

    res.send({
      message: "data berhasil di tambah",
      data: profile,
    });
  } else {
    res.status(400).send("input tidak valid");
  }
});

// EDIT PROFILE
app.patch("/profile/edit", (req, res) => {
  const { nama, umur, pekerjaan, hobby, index } = req.body;

  const parsingIndex = parseInt(index);
  const findIndex = profile.findIndex((res) => res.id === parsingIndex);

  let message = ""; // Nama Umur Pekerjaan

  if (nama) {
    profile[findIndex].nama = nama;
    message += "Nama, ";
  }

  if (umur) {
    profile[findIndex].umur = umur;
    message += "Umur, ";
  }

  if (pekerjaan) {
    profile[findIndex].pekerjaan = pekerjaan;
    message += "Pekerjaan, ";
  }

  if (hobby) {
    profile[findIndex].hobby = hobby;
    message += "Hobby, ";
  }

  res.send({
    message: `${message}berhasil di ubah`,
    data: profile,
  });
});

// DELETE PROFILE
app.delete("/profile/delete", (req, res) => {
  const { id } = req.body;

  const parsingIndex = parseInt(id);

  profile = profile.filter((res) => res.id !== parsingIndex);

  res.send({
    message: `Data id ke ${id} berhasil di delete`,
    data: profile,
  });
});

// end of bottom code
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
