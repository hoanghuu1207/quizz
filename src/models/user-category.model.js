const mongoose = require("mongoose");

const userCategorySchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      default: ""
    },
    category_id: {
      type: String,
      default: ""
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

const UserCategory = mongoose.model("UserCategory", userCategorySchema, "user-category");
module.exports = UserCategory;