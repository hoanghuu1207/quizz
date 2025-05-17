const User = require("../../models/user.model");

const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

module.exports.infoUser = async (req, res, next) => {
  try {
    const token = req.cookies.tokenUser;

    if (token) {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.tokenUser = decoded;
      
      const user = await User.findOne({
        _id: decoded._id,
        deleted: false
      }).select("-password");

      if (user) {
        res.locals.user = user;
      }
    }
  } catch (error) {
    console.error("Error verifying token:", error);
  }

  next();
}