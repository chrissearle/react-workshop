/* eslint-env mocha, node */

"use strict";

require("../../helper");

var React = require("react");

var Form = require("../../../src/screens/form/component");

describe("screens/form/Component", function () {
  it("should render the given form value", function () {
    var rendering = React.renderToString(<Form formValue="foo" />);

    rendering.should.include("foo");
  });

  it("should render an add item button", function () {
    var rendering = React.renderToString(<Form />);

    rendering.should.include("Add");
  });
});
