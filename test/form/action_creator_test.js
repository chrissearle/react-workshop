/* eslint-env mocha, node */

"use strict";

require("../helper");

var FormActions = require("../../src/form/actions");

var FormActionCreator = require("../../src/form/action_creator");

var FormService = require("../../src/form/service");

var Dispatcher = require("../../src/dispatcher");

describe("form/ActionCreator", function () {
  describe("changeField()", function () {
    it("should dispatch an CHANGE event with the form value", function () {
      this.sinon.spy(Dispatcher, "dispatch");

      FormActionCreator.changeField("foo");

      var args = Dispatcher.dispatch.args[0][0];

      args.type.should.equal(FormActions.CHANGE_FIELD);
      args.formValue.should.equal("foo");
    });
  });

  describe("blurField()", function () {
    it("should invoke FormService.saveFormValue() with the form value", function () {
      this.sinon.spy(FormService, "saveFormValue");

      FormActionCreator.blurField("foo");

      FormService.saveFormValue.should.have.been.calledWith("foo");
    });
  });
});
