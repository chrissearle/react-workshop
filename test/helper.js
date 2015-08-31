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
