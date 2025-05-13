const Category = require("../../models/category-card.model");
const approx = require('approximate-number');

module.exports.index = async (req, res) => {
  const categories = await Category.find({
    deleted: false
  }).limit(6).sort({favorite: "desc"}).select("title favorite slug");

  for (const category of categories) {
    category.approxFavorite = approx(category.favorite);
  }

  res.render("client/pages/home/index", {
    titlePage: "Quizz",
    categories
  });
};