const mongoose = require("mongoose");
const { Schema } = mongoose;

const topicSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  numberOfQuestions: {
    type: Number,
    require: true,
  },
  duration: { type: Number, require: true },
  passScore: { type: Number, require: true },
});

module.exports = mongoose.model("Topic", topicSchema);
