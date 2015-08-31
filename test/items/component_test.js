/* eslint-env mocha, node */

"use strict";

require("../helper");

var React = require("react/addons");

var TestUtils = React.addons.TestUtils;

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
      var items = ["foo", "bar"];

      var rendering = React.renderToString(<Items isLoading={false} items={items} />);

      rendering.should.include("foo");
      rendering.should.include("bar");
    });

    it("should render a delete button for each item", function () {
      var items = ["foo", "bar"];

      var component = TestUtils.renderIntoDocument(<Items isLoading={false} items={items} />);

      component.should.have.xpath("//li[contains(., 'foo')]/button[@class='delete']");
      component.should.have.xpath("//li[contains(., 'bar')]/button[@class='delete']");
    });

    it("should invoke a callback upon pressing a delete button", function () {
      var items = ["foo"];

      var onRemove = this.sinon.spy();

      var component = TestUtils.renderIntoDocument(<Items isLoading={false} items={items} onRemove={onRemove} />);

      var deleteButton = component.getDOMNode().querySelector("button.delete");

      TestUtils.Simulate.click(deleteButton);

      onRemove.should.have.been.calledWith(0);
    });

    it("should render the given form value", function () {
      var component = TestUtils.renderIntoDocument(<Items isLoading={false} formValue="foo" />);

      var textarea = component.getDOMNode().querySelector("textarea");

      textarea.value.should.equal("foo");
    });

    it("should render an add item button", function () {
      var component = TestUtils.renderIntoDocument(<Items isLoading={false} />);

      component.should.have.xpath("//button[contains(., 'Add')]");
    });

    it("should invoke a callback upon pressing the add button", function () {
      var onAdd = this.sinon.spy();

      var component = TestUtils.renderIntoDocument(<Items isLoading={false} onAdd={onAdd} formValue="foo" />);

      var addButton = component.getDOMNode().querySelector("button.add");

      TestUtils.Simulate.click(addButton);

      onAdd.should.have.been.calledWith("foo");
    });
  });
});
