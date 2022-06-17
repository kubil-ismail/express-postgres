const db = require("../db");
const model = require("../model/searchUserModel");

const getUsers = async (req, res) => {
  try {
    const getData = await model.getAllUser();

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
