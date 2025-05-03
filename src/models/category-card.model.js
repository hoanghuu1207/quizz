const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const categoryCardSchema = new mongoose.Schema(
  {
    title: String,
    favorite: {
      type: Number,
      default: 0
    },
    user_id: {
      type: String,
      default: ""
    }, 
    deleted: {
      type: Boolean,
      default: false
    },
    deletedAt: Date,
    slug: { type: String, slug: "title", unique: true},
  }, {
    timestamps: true
  }
);

const categoryCard = mongoose.model("CategoryCard", categoryCardSchema, "category-cards");
module.exports = categoryCard;