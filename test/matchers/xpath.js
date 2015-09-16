/* eslint-env browser, node */

"use strict";

var XPath = require("xpath-react/register");

var React = require("react/addons");

var TestUtils = React.addons.TestUtils;

module.exports = function (chai) {
  chai.Assertion.addMethod("xpath", function (expression) {
    /* eslint-disable no-underscore-dangle */
    var object = this._obj;
    /* eslint-enable no-underscore-dangle */

    if (!TestUtils.isElement(object)) {
      throw new Error("Expected a React element");
    }

    var result = XPath.evaluate(
        expression,
        object,
        null,
        XPath.XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    var expectedMessage = "Expected " + object + " to have xpath " + expression;
    var notExpectedMessage = "Expected " + object + " to not have xpath " + expression;

    this.assert(result, expectedMessage, notExpectedMessage);
  });
};
