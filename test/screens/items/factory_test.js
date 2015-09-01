/* eslint-env mocha, node */

"use strict";

require("../../helper");

var Dispatcher = require("../../../src/dispatcher");

var ItemsActions = require("../../../src/screens/items/actions");

var ItemsFactory = require("../../../src/screens/items/factory");

var ItemsStore;

var ApplicationActions = require("../../../src/screens/actions");

describe("screens/items/Factory", function () {
  beforeEach(function () {
    ItemsStore = new ItemsFactory();
    ItemsStore.register();
  });

  describe("in reaction to", function () {
    describe("ApplicationActions.START", function () {
      it("should change to a loading state", function () {
        Dispatcher.dispatch({
          type: ApplicationActions.START
        });

        ItemsStore.getIsLoading().should.equal(true);
      });
    });

    describe("ApplicationActions.LOADED", function () {
      it("should change to a non-loading state", function () {
        Dispatcher.dispatch({
          type: ApplicationActions.START
        });

        Dispatcher.dispatch({
          type: ApplicationActions.LOADED
        });

        ItemsStore.getIsLoading().should.equal(false);
      });

      it("should populate itself with the given items", function () {
        Dispatcher.dispatch({
          type: ApplicationActions.START
        });

        Dispatcher.dispatch({
          type: ApplicationActions.LOADED,
          items: ["foo", "bar"]
        });

        ItemsStore.getItems().should.deep.equal(["foo", "bar"]);
      });
    });

    describe("ItemsActions.ADD_ITEM", function () {
      it("should add an item to its list", function () {
        Dispatcher.dispatch({
          type: ItemsActions.ADD_ITEM,
          item: "foo"
        });

        ItemsStore.getItems().should.include("foo");
      });
    });

    describe("ItemsActions.REMOVE_ITEM", function () {
      it("should add an item to its list", function () {
        Dispatcher.dispatch({
          type: ItemsActions.ADD_ITEM,
          item: "foo"
        });

        Dispatcher.dispatch({
          type: ItemsActions.REMOVE_ITEM,
          iItem: 0
        });

        ItemsStore.getItems().should.not.include("foo");
      });
    });
  });
});
