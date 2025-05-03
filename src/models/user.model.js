const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    tokenUser: {
      type: String,
      default: ""
    },
    phone: String,
    avatar: {
      type: String,
      default: "https://th.bing.com/th/id/OIP.lF8ztkPyzv_NrpD7V8YYVAHaHa?rs=1&pid=ImgDetMain"
    },
    status: {
      type: String,
      default: "active"
    },
    deleted: {
      type: Boolean,
      default: false
    },
    deletedAt: Date
  }, {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema, 'users');
module.exports = User;