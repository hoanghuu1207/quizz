const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    title: String,
    answer: String,
    subject_id: {
      type: String,
      default: ""
    },
    level: String,
    deleted: {
      type: Boolean,
      default: false
    },
    deletedAt: Date
  }, {
    timestamps: true
  }
);

const Question = mongoose.model("Question", questionSchema, "questions");
module.exports = Question;