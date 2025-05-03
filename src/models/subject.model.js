const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const subjectSchema = new mongoose.Schema(
  {
    name: String,
    slug: { type: String, slug: "title", unique: true},
    deleted: {
      type: Boolean,
      default: true
    },
    deletedAt: Date
  }, {
    timestamps: true
  }
);

const Subject = mongoose.model("Subject", subjectSchema, "subjects");
module.exports = Subject;