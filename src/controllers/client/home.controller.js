const Category = require("../../models/category-card.model");
const Test = require("../../models/test.model");
const User = require("../../models/user.model");
const approx = require('approximate-number');

module.exports.index = async (req, res) => {
  const categories = await Category.find({
    deleted: false
  }).limit(6).sort({favorite: "desc"}).select("title favorite slug");

  for (const category of categories) {
    category.approxFavorite = approx(category.favorite);
  }

  const tests = await Test.find({
    deleted: false
  }).limit(6).select("title time userId slug");

  for (const test of tests) {
    const user = await User.findById(test.userId).select("firstName lastName");
    test.user = user.firstName + " " + user.lastName;
  }

  res.render("client/pages/home/index", {
    titlePage: "Quizz",
    categories,
    tests,
  });
};