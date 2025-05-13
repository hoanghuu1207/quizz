const Category = require("../../models/category-card.model");
const Card = require("../../models/card.model");
const Subject = require("../../models/subject.model");
const approx = require('approximate-number');

// [GET] /cards
module.exports.index = async (req, res) => {
  const categories = await Category.find({
    deleted: false
  }).sort({favorite: "desc"}).select("title favorite slug");

  console.log(categories);

  for (const category of categories) {
    category.approxFavorite = approx(category.favorite);
  }

  res.render("client/pages/card/index", {
    titlePage: "Quizz",
    categories
  });
};

// [GET] /cards/:slugCategory
module.exports.detail = async (req, res) => {
  const slug = req.params.slugCategory;
  const category = await Category.findOne({
    deleted: false,
    slug
  });

  if(category){
    const id = category.id;
    
    const cards = await Card.find({
      card_category_id: id
    });

    if(cards.length > 0){
      for (const card of cards) {
        const subject = await Subject.findOne({
          _id: card.subject_id,
          deleted: false
        }).select("name");
        card.subject = subject.name;
      }

      cards.sort(() => Math.random() - 0.5);

      res.render("client/pages/card/detail", {
        titlePage: "Cards",
        cards
      });
    }
  }else{
    res.render("client/pages/error/404", {
      titlePage: "404 Not Found"
    });
  }
};