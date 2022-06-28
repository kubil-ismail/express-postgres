const db = require("../db");
const model = require("../model/searchUserModel");

// const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const getData = await model.getAllUser();

    // ENCRYPT JWT
    // var token = jwt.sign(
    //   JSON.stringify(getData),
    //   process.env.SECRET_KEY ||
    //     "5e4abe48640c5751e0acf50c032dda3582aa09fe69e9e891e926d1a93798e8a2"
    // );

    res.send({ data: getData.rows, jumlahData: getData.rowCount });
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

const findEmailUsers = async (req, res) => {
  try {
    const { email } = req.body;
    const getData = await model.getByEmail(email);

    res.send({
      data: getData.rows,
      jumlahData: getData.rowCount,
    });
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

const findNameUsers = async (req, res) => {
  try {
    const { name } = req.body;
    const getData = await model.getByName(name);

    res.send({
      data: getData.rows,
      jumlahData: getData.rowCount,
    });
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

module.exports = { getProfile: getUsers, findEmailUsers, findNameUsers };
