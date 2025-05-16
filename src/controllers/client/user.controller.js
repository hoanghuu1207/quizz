const User = require("../../models/user.model");
const ForgotPassword = require("../../models/forgot-password.model");
const generateHelper = require("../../helpers/generate");
const sendMailHelper = require("../../helpers/sendMail");
const authService = require("../../services/auth.service");

//[GET] /users/register
module.exports.register = async (req, res) => {
  res.render("client/pages/user/register", {
    titlePage: "Sign up"
  });
};

//[POST] /users/register
module.exports.registerPost = async (req, res) => {
  try {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: password
    };

    const foundUser = await authService.register(user, res);

    if(foundUser){
      req.flash("success", "Successful");
      res.redirect("/users/login");
    }
  } catch (error) {
    console.log(error);
  }
};

//[GET] /users/login
module.exports.login = async (req, res) => {
  res.render("client/pages/user/login", {
    titlePage: "Sign in"
  })
}

//[POST] /users/login
module.exports.loginPost = async (req, res) => {
  try {
    const user = {
      email: req.body.email,
      password: req.body.password
    };

    const foundUser = await authService.login(user, res);

    if(foundUser){
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
};

//[GET] /user/logout
module.exports.logout = async (req, res) => {
  res.clearCookie("tokenUser");
  res.redirect("/users/login");
}

//[GET] /users/password/forgot
module.exports.forgotPassword = async (req, res) => {
  res.render("client/pages/user/forgot-password", {
    titlePage: "Forgot password"
  });
};

//[POST] /users/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
  const email = req.body.email;

  const user = await User.findOne({
    deleted: false,
    status: "active",
    email
  });

  if(!user){
    req.flash("error", "Email doesn't exist");
    res.redirect("back");
    return;
  }

  const otp = generateHelper.generateRandomNumber(6);

  const objectForgotPassword = {
    email: email,
    otp: otp,
    expireAt: Date.now()
  };

  const forgotPassword = new ForgotPassword(objectForgotPassword);
  await forgotPassword.save();

  const subject = `Mã OTP xác minh lấy lại mật khẩu`;
  const html = `
    Mã OTP xác minh lấy lại mật khẩu là <b>${otp}</b>. Thời hạn sử dụng là 3 phút. Lưu ý không được để lộ mã OTP.
  `;

  sendMailHelper.sendMail(email, subject, html);

  res.redirect(`/users/password/otp?email=${email}`);
};

//[GET] /users/password/otp
module.exports.otpPassword = async (req, res) => {
  const email = req.query.email;
  
  res.render("client/pages/user/otp-password", {
    email,
    titlePage: "Typing OTP"
  });
};

//[POST] /users/password/otp
module.exports.otpPasswordPost = async (req, res) => {
  const otpCode = req.body.otp;
  const email = req.body.email;

  const result = await ForgotPassword.findOne({
    email: email,
    otp: otpCode
  });

  if(!result){
    req.flash("error", "Wrong code");
    res.redirect("back");
    return;
  }

  const user = await User.findOne({
    email: email
  });

  res.cookie("tokenUser", user.tokenUser);
  res.redirect("/users/password/reset");
};

//[GET] /users/password/reset
module.exports.resetPassword = async (req, res) => {
  res.render("client/pages/user/reset-password", {
    titlePage: "Change password"
  });
};

//[POST] /users/password/reset
module.exports.resetPasswordPost = async (req, res) => {
  const password = req.body.password;
  const tokenUser = req.cookies.tokenUser;

  await User.updateOne(
    {
      tokenUser: tokenUser
    },
    {
      password: md5(password)
    }
  );
  
  req.flash("success", "Successful");
  res.redirect("/");
};

//[GET] /users/info
module.exports.info = async (req, res) => {
  res.render("client/pages/user/info", {
    titlePage: "Info user"
  });
};

//[PATCH] /users/info/upload
module.exports.infoUpload = async (req, res) => {
  const tokenUser = req.cookies.tokenUser;
  
  await User.updateOne(
    {
      tokenUser: tokenUser
    },
    {
      avatar: req.body.avatar    
    }
  );

  res.redirect("back"); 
};

//[PATCH] /users/info
module.exports.infoPatch = async (req, res) => {
  const tokenUser = req.cookies.tokenUser;

  await User.updateOne(
    {
      tokenUser: tokenUser
    }, {
      ...req.body
    }
  );

  res.redirect("back");
};