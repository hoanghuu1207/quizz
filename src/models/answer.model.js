const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema(
  {
    answer: String,
    isCorrect: Boolean,
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    }
  },
  {
    timestamps: true
  }
);

const Answer = mongoose.model('Answer', answerSchema, 'answers');
module.exports = Answer;