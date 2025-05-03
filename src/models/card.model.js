const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    question: String,
    answer: String,
    level: String,
    subject_id: {
      type: String,
      default: ""
    },
    card_category_id: {
      type: String,
      default: ""
    }
  }
);

const Card = mongoose.model("Card", cardSchema, "cards");
module.exports = Card;