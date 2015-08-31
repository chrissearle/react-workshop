/* eslint-env mocha, node */

"use strict";

require("../helper");

var Promise = require("bluebird");

var ApplicationActions = require("../../src/application/actions");

var ApplicationActionCreator = require("../../src/application/action_creator");

var ItemsService = require("../../src/items/service");

var FormService = require("../../src/form/service");

var Dispatcher = require("../../src/dispatcher");

describe("application/ActionsCreator", function () {
  describe("start()", function () {
    beforeEach(function () {
      this.sinon.stub(ItemsService, "getItems").returns(Promise.resolve(["foo", "bar"]));
      this.sinon.stub(FormService, "getFormValue").returns(Promise.resolve("foo"));
    });

    it("should dispatch an START event", function () {
      this.sinon.spy(Dispatcher, "dispatch");

      ApplicationActionCreator.start();

      var args = Dispatcher.dispatch.args[0][0];

      args.type.should.equal(ApplicationActions.START);
    });

    it("should invoke ItemsService.getItems()", function () {
      ApplicationActionCreator.start();

      /* eslint-disable no-unused-expressions */
      ItemsService.getItems.should.have.been.called;
      /* eslint-enable no-unused-expressions */
    });

    it("should invoke FormService.getFormValue()", function () {
      ApplicationActionCreator.start();

      /* eslint-disable no-unused-expressions */
      FormService.getFormValue.should.have.been.called;
      /* eslint-enable no-unused-expressions */
    });

    it("should eventually dispatch an LOADED event with items and form value", function (done) {
      this.sinon.spy(Dispatcher, "dispatch");

      ApplicationActionCreator.start();

      setTimeout(function () {
        var args = Dispatcher.dispatch.args[1][0];

        args.type.should.equal(ApplicationActions.LOADED);
        args.items.should.deep.equal(["foo", "bar"]);
        args.formValue.should.deep.equal("foo");

        done();
      });
    });
  });
});
