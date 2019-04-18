const expect = require("expect");
const request = require("supertest");
const { ObjectID } = require("mongodb");

const todo = require("./../../Models/TodoModel");
const app = require("../server.js").app;

var todoList = [
  {
    _id: new ObjectID(),
    task: "first task",
    completed: true
  },
  {
    _id: new ObjectID(),
    task: "first task",
    completed: true
  }
];

beforeEach(done => {
  todo
    .deleteMany({})
    .then(() => {
      todo.insertMany(todoList);
    })
    .then(() => done());
});

describe("Server API Requests Test", () => {
  describe("POST /todos", () => {
    it("Should create a new todo", done => {
      var todoIns = { task: "Studying testing node apps", completed: true };
      request(app)
        .post("/todos")
        .send(todoIns)
        .expect(200)
        .expect(res => {
          expect(res.body.task).toBe("Studying testing node apps");
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          todo
            .find({ task: "Studying testing node apps" })
            .then(todos => {
              expect(todos.length).toBe(1);
              expect(todos[0].task).toBe(todoIns.task);
              done();
            })
            .catch(e => done(e));
        });
    });
    it("should not create todo with invalid body data", done => {
      request(app)
        .post("/todos")
        .send({})
        .expect(400)
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          todo
            .find()
            .then(todos => {
              expect(todos.length).toBe(2);
              done();
            })
            .catch(e => done(e));
        });
    });
  });
  describe("GET /todos", () => {
    it("Should get all the todos", done => {
      request(app)
        .get("/todos")
        .expect(200)
        .expect(res => {
          expect(res.body.length).toBe(2);
        })
        .end(done);
    });
  });

  describe("GET /todos/:id", () => {
    it("Should return a todo", done => {
      request(app)
        .get(`/todos/${todoList[0]._id.toHexString()}`)
        .expect(200)
        .expect(res => {
          expect(res.body.todo.task).toBe(todoList[0].task);
        })
        .end(done);
    });

    it("Should return 404 for not found ObjectID", done => {
      request(app)
        .get(`/todos/${new ObjectID().toHexString()}`)
        .expect(404)
        .end(done);
    });

    it("Should return 404 for inValid ObjectID", done => {
      request(app)
        .get(`/todos/${123}`)
        .expect(404)
        .end(done);
    });
  });
});
