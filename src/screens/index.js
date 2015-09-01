/* eslint-env node */

"use strict";

var React = require("react");

var Application = require("./component");

module.exports = React.createClass({
  displayName: "ApplicationPage",

  render: function () {
    return <Application />;
  }
});
