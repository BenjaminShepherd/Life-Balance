var db = require("../models");

module.exports = function (app) {
  // // Get all examples
  // app.get("/api/examples", function (req, res) {
  //   db.Example.findAll({}).then(function (dbExamples) {
  //     res.json(dbExamples);
  //   });
  // });

  // // Create a new example
  // app.post("/api/examples", function (req, res) {
  //   db.Example.create(req.body).then(function (dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // // Delete an example by id
  // app.delete("/api/examples/:id", function (req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // =====================================================

  app.post("/api/todos", function (req, res) {
    db.Task.create(req.body).then(function (data) {
      res.json(data);
    });
  });

  app.put("/api/todos/:id", function (req, res) {
    // what is it updating? the todo completeion status?
    // db.Task.update({})
  });

  app.delete("/api/todos/:id", function (req, res) {
    db.Task.destroy({ where: { id: req.params.id } }).then(function (data) {
      res.json(data);
    });
  });
};