/* eslint-env mocha, node */

"use strict";

require("../helper");

var nock = require("nock");

var FormService = require("../../src/form/service");

describe("form/Service", function () {
  describe("getFormValue()", function () {
    it("should fetch the form value", function () {
      nock("http://localhost")
        .get("/form")
        .reply(200, "foo");

      var formValue = FormService.getFormValue();

      return formValue.should.eventually.deep.equal("foo");
    });
  });

  describe("saveFormValue()", function () {
    it("should perform a post request with the form value", function () {
      var request = nock("http://localhost")
        .post("/form?formValue=foo")
        .reply(200);

      FormService.saveFormValue("foo");

      request.isDone().should.equal(true);
    });
  });
});
