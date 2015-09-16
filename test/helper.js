/* eslint-env browser, mocha, node */

"use strict";

var chai = require("chai");

chai.should();
chai.use(require("sinon-chai"));
chai.use(require("chai-as-promised"));
chai.use(require("./matchers/xpath"));

var sinon = require("sinon");

beforeEach(function() {
  this.sinon = sinon.sandbox.create();
});

afterEach(function(){
  this.sinon.restore();
});

var jsdom = require("jsdom");

global.document = jsdom.jsdom("<!doctype html><html><body></body></html>");
global.window = document.parentWindow;

for (var property in window) {
  if (window.hasOwnProperty(property) && !(property in global)) {
    global[property] = window[property];
  }
}

var React = require("react/addons");

var Simulate = {};

["click"].forEach(function (action) {
  Simulate[action] = function (component, eventData) {
    var eventName = "on" + action.charAt(0).toUpperCase() + action.slice(1);

    if (component.props[eventName]) {
      component.props[eventName](eventData);
    } else {
      throw new Error("No event handler for " + eventName);
    }
  };
});

var XPath = require("xpath-react/register");

module.exports = {
  render: function (reactElement) {
    var renderer = React.addons.TestUtils.createRenderer();
    renderer.render(reactElement);
    return renderer.getRenderOutput();
  },

  find: function (component, expression) {
    return XPath.evaluate(
      expression,
      component,
      null,
      XPath.XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  },

  Simulate: Simulate
};
