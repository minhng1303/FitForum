const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    body: {
      type: String,
      require: true,
    },
    author: {
      username: { type: String, require: true },
      image: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentSchema);
