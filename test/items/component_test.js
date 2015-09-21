/* eslint-env mocha, node */

"use strict";

require("../helper");

var React = require("react");

var Items = require("../../src/items/component");

describe("items/Component", function () {
  describe("when isLoading is true", function () {
    it("should render a loading text", function () {
      var rendering = React.renderToString(<Items isLoading={true} />);

      rendering.should.include("Loading items..");
    });
  });

  describe("when isLoading is false", function () {
    it("should render the given items", function () {
      var items = [{ name: "foo", complete: false },{ name: "bar", complete: false}];

      var rendering = React.renderToString(<Items isLoading={false} items={items} />);

      rendering.should.include("foo");
      rendering.should.include("bar");
    });

    it("should render a delete button for each item", function () {
      var items = ["foo", "bar"];

      var rendering = React.renderToString(<Items isLoading={false} items={items} />);

      rendering.should.include("Delete");

      // The rest of the string after the first occurrence
      rendering = rendering.substring(rendering.indexOf("Delete") + "Delete".length);

      rendering.should.include("Delete");
    });

    it("should render the given form value", function () {
      var rendering = React.renderToString(<Items isLoading={false} formValue="foo" />);

      rendering.should.include("foo");
    });

    it("should render an add item button", function () {
      var rendering = React.renderToString(<Items isLoading={false} />);

      rendering.should.include("Add");
    });
  });
});
