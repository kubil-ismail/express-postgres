const db = require("../db");

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users WHERE id = $1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const addUser = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *`,
      [props.name, props.email],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const addDetailUser = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO detail (id, job_title, education, user_id) VALUES ($1, $2, $3, $4)`,
      [props.userId, props.job, props.education, props.userId],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const editUser = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE users SET name = $1, email = $2 WHERE id = $3`,
      [props.name, props.email, props.id],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM users WHERE id = $1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        deleteDetailUser(id)
          .then(() => resolve(result))
          .catch((_error) => reject(_error));
      }
    });
  });
};

const deleteDetailUser = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM detail WHERE id = $1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  getUserById,
  addUser,
  addDetailUser,
  editUser,
  deleteUser,
  deleteDetailUser,
};
