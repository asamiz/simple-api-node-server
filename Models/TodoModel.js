const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect(
  "mongodb+srv://todouser:qHs5nuSgtGKwwyMk@cluster0-2gsxp.mongodb.net/TodoApp?retryWrites=true",
  {
    useNewUrlParser: true
  }
);

//coment
const todoSchema = mongoose.Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, required: true }
});

module.exports = mongoose.model("Todo", todoSchema);
