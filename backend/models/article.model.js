const mongoose = require("mongoose");
const { Schema } = mongoose;

const articleSchema = new Schema(
  {
    slug: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    body: { type: String, required: true },
    author: {
      username: {
        type: String,
        require: true,
      },
      image: String,
      required: false,
    },
    tagList: [String],
    favoritesCount: {
      type: Number,
      default: 0,
    },
    comments: [],
    favorited: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Article", articleSchema);
