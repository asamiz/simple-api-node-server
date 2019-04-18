const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/TodoApp", {
  useNewUrlParser: true
});

const todoSchema = mongoose.Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, required: true }
});

module.exports = mongoose.model("Todo", todoSchema);
