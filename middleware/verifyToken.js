const jwt = require("jsonwebtoken");

const checkToken = async (req, res, next) => {
  try {
    const token = req.headers?.authorization;
    const decoded = jwt.verify(
      token?.substring(7, token?.length),
      "5e4abe48640c5751e0acf50c032dda3582aa09fe69e9e891e926d1a93798e8a2"
    );

    if (decoded) {
      next();
    }
  } catch (error) {
    res.status(401).send("token tidak valid");
  }
};

module.exports = { checkToken };
