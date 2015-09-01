/* eslint-env mocha, node */

"use strict";

require("../../helper");

var Dispatcher = require("../../../src/dispatcher");

var ItemsActions = require("../../../src/screens/items/actions");

var FormActions = require("../../../src/screens/form/actions");

var FormFactory = require("../../../src/screens/form/factory");

var FormStore;

describe("screens/form/Factory", function () {
  beforeEach(function () {
    FormStore = new FormFactory();
    FormStore.register();
  });

  describe("in reaction to", function () {
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
