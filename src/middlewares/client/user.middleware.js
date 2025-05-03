const User = require("../../models/user.model");

module.exports.infoUser = async (req, res, next) => {
  if(req.cookies.tokenUser){
    const user = await User.findOne({
      tokenUser: req.cookies.tokenUser,
      deleted: false
    }).select("-password");

    if(user){
      res.locals.user = user;
    }
  }
  next();
}