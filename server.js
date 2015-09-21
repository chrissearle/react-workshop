/* eslint-env node */

"use strict";

var babelify = require("babelify"),
    browserify = require("browserify"),
    express = require("express");

var application = express();

var items = [
    {
        name: "foo",
        complete: false
    },
    {
        name: "bar",
        complete: false

    },
    {
        name: "baz",
        complete: false
    }];

var formValue = "";

application.get("/items", function (request, response) {
    response.send(JSON.stringify(items));
});

application.post("/items", function (request, response) {
    items.push({
        name: request.query.item,
        complete: false
    });
    response.send();
});

application.post("/toggle/:index", function (request, response) {
    items[request.params.index].complete = !items[request.params.index].complete;
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
