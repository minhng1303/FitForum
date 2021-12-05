const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionSchema = new Schema({
  answers: [String],
  text: String,
  correctAnswer: Number,
});

const schema = mongoose.model("question", questionSchema);
module.exports = schema;
