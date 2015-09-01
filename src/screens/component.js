/* eslint-env node */

"use strict";

var React = require("react");

var {Link, RouteHandler} = require("react-router");

module.exports = React.createClass({
  displayName: "Layout",

  render: function () {
    return (
      <div>
        <ul id="navigation">
          <li><Link to="items">Items</Link></li>
          <li><Link to="form">Form</Link></li>
        </ul>

        <RouteHandler />
      </div>
    );
  }
});
