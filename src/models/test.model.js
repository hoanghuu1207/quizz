const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
  {
    title: String,
    time: Number,
    deleted: {
      type: Boolean,
      default: false
    },
    deletedAt: Date
  }, {
    timestamps: true
  }
);

const Test = mongoose.model("Test", testSchema, "tests");
module.exports = Test;