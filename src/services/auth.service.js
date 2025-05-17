const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

const register = async (user) => {
  try {
    const existEmail = await User.findOne({
      email: user.email,
      deleted: false
    });

    if (existEmail) {
      res.redirect('back');
      throw new Error('Email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    
    const newUser = new User(user);
    await newUser.save();

    return newUser;
  } catch (error) {
    throw error;
  }
};

const login = async (user, res) => {
  try{
    const foundUser = await User.findOne({ email: user.email, deleted: false });

    if (!foundUser) {
      res.redirect('/users/login');
      throw new Error('Email not correct');
    }

    const isMatch = await bcrypt.compare(user.password, foundUser.password);

    if (isMatch) {
      const token = jwt.sign(
        { _id: foundUser._id?.toString(), email: foundUser.email },
        process.env.SECRET_KEY,
        { expiresIn: '2 days' }
      );

      res.cookie('tokenUser', token, {
        maxAge: 2 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        // sameSite: 'strict'
      });

      return { user: { _id: foundUser._id, email: foundUser.email}, token: token };
    }else{
      res.redirect('/users/login');
      throw new Error('Password not correct');
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  register,
  login
};
