// Libraries requires
const express = require("express");
const bodyParser = require("body-parser");
var { ObjectID } = require("mongodb");

// Local requires
const TodoModel = require("../Models/TodoModel");

//comment

// Settin the Port
let port = process.env.PORT || 6644;

let app = express();
app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  var todo = new TodoModel({
    task: req.body.task,
    completed: req.body.completed
  });
  todo.save().then(
    () => {
      res.send(todo);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get("/todos", (req, res) => {
  TodoModel.find().then(todoList => {
    res.send(todoList);
  });
});

app.get("/todos/:id", (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  } else {
    TodoModel.findById(id)
      .then(todo => {
        if (!todo) {
          res.status(404).send();
        }
        res.send({ todo });
      })
      .catch(err => {
        res.status(400).send();
      });
  }
});

app.listen(port, () => {
  console.log(`Server is alive >>>>>>>>> PORT ${port}`);
});

module.exports.app = app;
