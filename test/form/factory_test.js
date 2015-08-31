/* eslint-env mocha, node */

"use strict";

require("../helper");

var Dispatcher = require("../../src/dispatcher");

var ApplicationActions = require("../../src/application/actions");

var ItemsActions = require("../../src/items/actions");

var FormActions = require("../../src/form/actions");

var FormFactory = require("../../src/form/factory");

var FormStore;

describe("form/Factory", function () {
  beforeEach(function () {
    FormStore = new FormFactory();
    FormStore.register();
  });

  describe("in reaction to", function () {
    describe("ApplicationActions.LOADED", function () {
      it("should populate itself with the given form value", function () {
        Dispatcher.dispatch({
          type: ApplicationActions.LOADED,
          formValue: "foo"
        });

        FormStore.getFormValue().should.equal("foo");
      });
    });

    describe("FormActions.CHANGE_FIELD", function () {
      it("should change the form value", function () {
        Dispatcher.dispatch({
          type: FormActions.CHANGE_FIELD,
          formValue: "foo"
        });

        FormStore.getFormValue().should.equal("foo");
      });
    });

    describe("ItemsActions.ADD_ITEM", function () {
      it("should reset the form value", function () {
        Dispatcher.dispatch({
          type: FormActions.CHANGE_FIELD,
          formValue: "foo"
        });

        Dispatcher.dispatch({
          type: ItemsActions.ADD_ITEM
        });

        FormStore.getFormValue().should.equal("");
      });
    });
  });
});
