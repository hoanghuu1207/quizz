module.exports.registerPost = async (req, res, next) => {
  if(!req.body.firstName){
    req.flash("error", "Fill in the information");
    res.redirect("back");
    return;
  }
  if(!req.body.lastName){
    req.flash("error", "Fill in the information");
    res.redirect("back");
    return;
  }
  if(!req.body.email){
    req.flash("error", "Fill in the information");
    res.redirect("back");
    return;
  }
  if(!req.body.password){
    req.flash("error", "Fill in the information");
    res.redirect("back");
    return;
  }

  next();
};

module.exports.loginPost = (req, res, next) => {
  if(!req.body.email){
		req.flash("error", `Fill in the information`);
		res.redirect("back");
		return;
	}
  if(!req.body.password){
		req.flash("error", `Fill in the information`);
		res.redirect("back");
		return;
	}
	next();
};

module.exports.forgotPasswordPost = (req, res, next) => {
  if(!req.body.email){
		req.flash("error", `Fill in the information`);
		res.redirect("back");
		return;
	}
	next();
};

module.exports.resetPasswordPost = (req, res, next) => {
  if(!req.body.password){
		req.flash("error", `Fill in the information`);
		res.redirect("back");
		return;
	}
	if(!req.body.confirmPassword){
		req.flash("error", `Fill in the information`);
		res.redirect("back");
		return;
	}
  if(req.body.password != req.body.confirmPassword) {
    req.flash("error", `Password do not match`);
    res.redirect("back");
    return;
  }

	next();
};