/* eslint-env node */

"use strict";

var babelify = require("babelify"),
    browserify = require("browserify"),
    express = require("express");

var application = express();

var items = ["foo", "bar", "baz"];

var formValue = "";

application.get("/items", function (request, response) {
  setTimeout(function () {
    response.send(JSON.stringify(items));
  }, 2000);
});

application.post("/items", function (request, response) {
  items.push(request.query.item);
  formValue = "";
  response.send();
});

application.delete("/items/:index", function (request, response) {
  items.splice(request.params.index, 1);
  response.send();
});

application.get("/form", function (request, response) {
  response.send(formValue);
});

application.post("/form", function (request, response) {
  formValue = request.query.formValue;
  response.send();
});

application.get("/application.js", function (request, response) {
  browserify("src/application.js").transform(babelify).bundle().pipe(response);
});

application.use(express.static("src"));

application.listen(8080, function () {
  console.log("listening on port 8080");
});
