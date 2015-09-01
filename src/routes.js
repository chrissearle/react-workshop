/* eslint-env node */

"use strict";

/* eslint-disable no-unused-vars */
var React = require("react");
/* eslint-enable no-unused-vars */

var {Redirect, Route} = require("react-router");

var ApplicationPage = require("./screens/index");

var ItemsPage = require("./screens/items/index");

var FormPage = require("./screens/form/index");

module.exports = (
  <Route path="/" handler={ApplicationPage}>
    <Route name="items" path="items" handler={ItemsPage} />
    <Route name="form" path="form" handler={FormPage} />
    <Redirect to="items" />
  </Route>
);
