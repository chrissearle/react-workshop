/* eslint-env mocha, node */

"use strict";

var chai = require("chai");

chai.should();
chai.use(require("sinon-chai"));
chai.use(require("chai-as-promised"));

var sinon = require("sinon");

beforeEach(function() {
  this.sinon = sinon.sandbox.create();
});

afterEach(function(){
  this.sinon.restore();
});
