const mongoose = require("mongoose");
const { Schema } = mongoose;

const tagSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Tag", tagSchema);
