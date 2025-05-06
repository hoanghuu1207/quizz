const mongoose = require('mongoose');
const historySchema = new mongoose.Schema(
  {
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Test'
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    score: Number,
    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Question'
        },
        answerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Answer'
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

const History = mongoose.model('History', historySchema, 'histories');
module.exports = History;