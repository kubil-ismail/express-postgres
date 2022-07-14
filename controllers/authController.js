const model = require("../model/searchUserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // search user
    const getUserByEmail = await model.getByEmail(email);

    if (getUserByEmail?.rowCount) {
      // validate password
      const checkPasswrod = bcrypt.compareSync(
        password,
        getUserByEmail?.rows[0]?.password
      ); // true or false

      if (checkPasswrod) {
        const token = jwt.sign(
          getUserByEmail?.rows[0],
          "5e4abe48640c5751e0acf50c032dda3582aa09fe69e9e891e926d1a93798e8a2",
          { expiresIn: "24h" }
        );

        res.status(200).send({
          user: { ...getUserByEmail?.rows[0], ...{ password: null } },
          token,
        });
      } else {
        res.status(401).send("password tidak sesuai");
      }
    } else {
      res.status(400).send("user tidak terdaftar");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("ada yang error");
  }
};

module.exports = { login };
