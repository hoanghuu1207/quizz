const User = require("../../models/user.model");

const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

module.exports.requireAuth = async (req, res, next) => {
  if(!req.cookies.tokenUser){
    req.flash("warning", "Please login!");
    res.redirect("/users/login");
    return;
  }

  const token = req.cookies.tokenUser;

  const decoded = jwt.verify(token, SECRET_KEY);
  req.tokenUser = decoded;

  const user = await User.findOne({
    _id: decoded._id,
    deleted: false
  }).select("-password");

  if (user) {
    res.locals.user = user;
  } else {
    req.flash("warning", "Please login!");
    res.redirect("/users/login");
    return;
  }

  next();
}