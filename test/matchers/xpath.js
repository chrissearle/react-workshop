/* eslint-env browser, node */

"use strict";

var React = require("react/addons");

var TestUtils = React.addons.TestUtils;

module.exports = function (chai) {
  chai.Assertion.addMethod("xpath", function (expression) {
    /* eslint-disable no-underscore-dangle */
    var object = this._obj;
    /* eslint-enable no-underscore-dangle */

    if (!(object instanceof HTMLElement) && !TestUtils.isCompositeComponent(object)) {
      throw new Error("Expected either a React component or a HTMLElement");
    }

    var domNode = object.getDOMNode ? object.getDOMNode() : object;

    document.body.appendChild(domNode.parentNode);

    var result = document.evaluate(
        expression,
        domNode.parentNode,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    document.body.removeChild(domNode.parentNode);

    var expectedMessage = "Expected " + domNode.outerHTML + " to have xpath " + expression;
    var notExpectedMessage = "Expected " + domNode.outerHTML + " to not have xpath " + expression;

    this.assert(result, expectedMessage, notExpectedMessage);
  });
};
