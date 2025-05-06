const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    title: String,
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test"
    },
  }, {
    timestamps: true
  }
);

const Question = mongoose.model("Question", questionSchema, "questions");
module.exports = Question;