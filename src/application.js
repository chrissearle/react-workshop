/* eslint-env browser, node */

"use strict";

var React = require("react");

var ReactRouter = require("react-router");

var Routes = require("./routes");

var FormStore = require("./screens/form/store");

var ItemsStore = require("./screens/items/store");

var ApplicationctionCreator = require("./screens/action_creator");

ReactRouter.run(Routes, ReactRouter.HashLocation, function (Handler) {
  React.render(<Handler />, document.getElementById("todo-application"));
});

FormStore.register();
ItemsStore.register();

ApplicationctionCreator.start();
