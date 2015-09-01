/* eslint-env mocha, node */

"use strict";

require("../helper");

var Promise = require("bluebird");

var ApplicationActions = require("../../src/screens/actions");

var ApplicationActionCreator = require("../../src/screens/action_creator");

var ItemsService = require("../../src/screens/items/service");

var Dispatcher = require("../../src/dispatcher");

describe("screens/ActionsCreator", function () {
  describe("start()", function () {
    beforeEach(function () {
      this.sinon.stub(ItemsService, "getItems").returns(Promise.resolve(["foo", "bar"]));
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

    it("should eventually dispatch an LOADED event with items", function (done) {
      this.sinon.spy(Dispatcher, "dispatch");

      ApplicationActionCreator.start();

      setTimeout(function () {
        var args = Dispatcher.dispatch.args[1][0];

        args.type.should.equal(ApplicationActions.LOADED);
        args.items.should.deep.equal(["foo", "bar"]);

        done();
      });
    });
  });
});
