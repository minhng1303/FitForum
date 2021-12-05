const mongoose = require("mongoose");
const Question = require("./question.model");
const { Schema } = mongoose;

const attemptSchema = new Schema(
  {
    questions: [],
    completed: {
      type: Boolean,
      default: true,
    },
    correctAnswers: {},
    answers: {},
    score: {
      type: Number,
      default: 0,
    },
    scoreText: {
      type: String,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Attempt", attemptSchema);
