/* eslint-env mocha, node */

"use strict";

var Helper = require("../helper");

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
      var items = ["foo", "bar"];

      var component = Helper.render(<Items isLoading={false} items={items} />);

      component.should.have.xpath(".//li[contains(., 'foo')]");
      component.should.have.xpath(".//li[contains(., 'bar')]");
    });

    it("should render a delete button for each item", function () {
      var items = ["foo", "bar"];

      var component = Helper.render(<Items isLoading={false} items={items} />);

      component.should.have.xpath("//li[contains(., 'foo')]/button[@class='delete']");
      component.should.have.xpath("//li[contains(., 'bar')]/button[@class='delete']");
    });

    it("should invoke a callback upon pressing a delete button", function () {
      var items = ["foo"];

      var onRemove = this.sinon.spy();

      var component = Helper.render(<Items isLoading={false} items={items} onRemove={onRemove} />);

      var deleteButton = Helper.find(component, ".//button[@class='delete']");

      Helper.Simulate.click(deleteButton);

      onRemove.should.have.been.calledWith(0);
    });

    it("should render the given form value", function () {
      var component = Helper.render(<Items isLoading={false} formValue="foo" />);

      var textarea = Helper.find(component, ".//textarea");

      textarea.props.value.should.equal("foo");
    });

    it("should render an add item button", function () {
      var component = Helper.render(<Items isLoading={false} />);

      component.should.have.xpath("//button[contains(., 'Add')]");
    });

    it("should invoke a callback upon pressing the add button", function () {
      var onAdd = this.sinon.spy();

      var component = Helper.render(<Items isLoading={false} onAdd={onAdd} formValue="foo" />);

      var addButton = Helper.find(component, ".//button[@class='add']");

      Helper.Simulate.click(addButton);

      onAdd.should.have.been.calledWith("foo");
    });
  });
});
