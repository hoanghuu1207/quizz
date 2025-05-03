const mongoose = require("mongoose");

const favoriteCategoryCardSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      default: ""
    },
    category_id: {
      type: String,
      default: ""
    }
  }
);

const FavoriteCategoryCard = mongoose.model("FavoriteCategoryCard", favoriteCategoryCardSchema, "favorite-category-cards");
module.exports = FavoriteCategoryCard;