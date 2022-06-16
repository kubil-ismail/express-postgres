const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const helmet = require("helmet");
const db = require("./db");

// request = input
// response = output
app.use(helmet());

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

let profile = [];

// GET USERS
app.get("/users", (req, res) => {
  db.query(
    `SELECT * FROM users RIGHT JOIN detail ON users.id = detail.user_id ORDER BY users.id ASC`,
    (error, result) => {
      if (error) {
        res.status(400).send("ada yang error");
      } else {
        res.send({ data: result.rows, jumlahData: result.rowCount });
      }
    }
  );
});

// FIND USERS
app.get("/users/find", (req, res) => {
  const { email } = req.body;
  db.query(`SELECT * FROM users WHERE email = $1`, [email], (error, result) => {
    if (error) {
      res.status(400).send("ada yang error");
    } else {
      res.send({ data: result.rows, jumlahData: result.rowCount });
    }
  });
});

// POST PROFILE
app.post("/users/add", (req, res) => {
  const { name, email, job, education } = req.body;

  db.query(
    `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *`,
    [name, email],
    (error, result) => {
      if (error) {
        console.log("error", error);
        res.status(400).send("ada yang error");
      } else {
        let userId = result.rows[0]?.id;
        db.query(
          `INSERT INTO detail (id, job_title, education, user_id) VALUES ($1, $2, $3, $4)`,
          [userId, job, education, userId],
          (error, result) => {
            if (error) {
              console.log("error", error);
              res.status(400).send("ada yang error");
            } else {
              res.send("data berhasil di tambah");
            }
          }
        );
      }
    }
  );
});

// EDIT PROFILE
app.patch("/users/edit", (req, res) => {
  const { name, email, id } = req.body;
  db.query(`SELECT * FROM users WHERE id = $1`, [id], (error, result) => {
    if (error) {
      res.status(400).send("ada yang error");
    } else {
      if (result.rowCount > 0) {
        let inputNama = name || result?.rows[0]?.name;
        let inputEmail = email || null;

        let message = "";

        if (name) message += "nama,";
        if (email) message += "email,";

        db.query(
          `UPDATE users SET name = $1, email = $2 WHERE id = $3`,
          [inputNama, inputEmail, id],
          (error, result) => {
            if (error) {
              console.log("error", error);
              res.status(400).send("ada yang error");
            } else {
              res.send(`${message} berhasil di ubah`);
            }
          }
        );
      } else {
        res.status(400).send("data tidak di temukan");
      }
    }
  });
});

// DELETE PROFILE
app.delete("/users/delete", (req, res) => {
  const { id } = req.body;

  db.query(`SELECT * FROM users WHERE id = $1`, [id], (error, result) => {
    if (error) {
      res.status(400).send("ada yang error");
    } else {
      if (result.rowCount > 0) {
        db.query(`DELETE FROM users WHERE id = $1`, [id], (error, result) => {
          if (error) {
            res.status(400).send("ada yang error");
          } else {
            res.send("data berhasil di hapus");
          }
        });
      } else {
        res.status(400).send("data tidak di temukan");
      }
    }
  });
});

// end of bottom code
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
