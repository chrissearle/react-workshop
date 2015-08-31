/* eslint-env mocha, node */

"use strict";

require("../helper");

var ItemsActions = require("../../src/items/actions");

var ItemsActionCreator = require("../../src/items/action_creator");

var ItemsService = require("../../src/items/service");

var Dispatcher = require("../../src/dispatcher");

describe("items/ActionsCreator", function () {
  describe("addItem()", function () {
    beforeEach(function () {
      this.sinon.stub(ItemsService, "addItem").returns(Promise.resolve());
    });

    it("should invoke ItemsService.addItem()", function () {
      ItemsActionCreator.addItem("foo");

      ItemsService.addItem.should.have.been.calledWith("foo");
    });

    it("should eventually dispatch an ADD event with the item", function (done) {
      this.sinon.spy(Dispatcher, "dispatch");

      ItemsActionCreator.addItem("foo");

      setTimeout(function () {
        var args = Dispatcher.dispatch.args[0][0];

        args.type.should.equal(ItemsActions.ADD_ITEM);
        args.item.should.equal("foo");

        done();
      });
    });
  });

  describe("checkItem()", function () {
    beforeEach(function () {
      this.sinon.stub(ItemsService, "checkItem").returns(Promise.resolve());
    });

    it("should invoke ItemsService.checkItem()", function () {
      ItemsActionCreator.checkItem(1, true);

      ItemsService.checkItem.should.have.been.calledWith(1, true);
    });

    it("should eventually dispatch an CHECK event with the index and checked status", function (done) {
      this.sinon.spy(Dispatcher, "dispatch");

      ItemsActionCreator.checkItem(1, true);

      setTimeout(function () {
        var args = Dispatcher.dispatch.args[0][0];

        args.type.should.equal(ItemsActions.CHECK_ITEM);
        args.iItem.should.equal(1);
        args.checked.should.equal(true);

        done();
      });
    });
  });

  describe("removeItem()", function () {
    beforeEach(function () {
      this.sinon.stub(ItemsService, "removeItem").returns(Promise.resolve());
    });

    it("should invoke ItemsService.removeItem()", function () {
      ItemsActionCreator.removeItem(1);

      ItemsService.removeItem.should.have.been.calledWith(1);
    });

    it("should eventually dispatch an REMOVE event with the item index", function (done) {
      this.sinon.spy(Dispatcher, "dispatch");

      ItemsActionCreator.removeItem(1);

      setTimeout(function () {
        var args = Dispatcher.dispatch.args[0][0];

        args.type.should.equal(ItemsActions.REMOVE_ITEM);
        args.iItem.should.equal(1);

        done();
      });
    });
  });
});
