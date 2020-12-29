var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var User = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    default: "male",
  },
  age: Number,
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", User);
