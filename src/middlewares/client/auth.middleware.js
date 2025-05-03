const User = require("../../models/user.model");

module.exports.requireAuth = async (req, res, next) => {
  if(!req.cookies.tokenUser){
    req.flash("warning", "Please login!");
    res.redirect("/users/login");
    return;
  }

  const user = await User.findOne({
    tokenUser: req.cookies.tokenUser,
    deleted: false
  }).select("-password");

  if(!user){
    res.redirect("/users/login");
    return;
  }

  next();
}