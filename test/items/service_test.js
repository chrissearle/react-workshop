/* eslint-env mocha, node */

"use strict";

require("../helper");

var nock = require("nock");

var ItemsService = require("../../src/items/service");

describe("items/Service", function () {
  describe("getItems()", function () {
    it("should fetch the list of items", function () {
      nock("http://localhost")
        .get("/items")
        .reply(200, ["foo", "bar"]);

      var items = ItemsService.getItems();

      return items.should.eventually.deep.equal(["foo", "bar"]);
    });
  });

  describe("addItem()", function () {
    it("should perform a post request with the item", function () {
      var request = nock("http://localhost")
        .post("/items?item=foo")
        .reply(200);

      ItemsService.addItem("foo");

      request.isDone().should.equal(true);
    });
  });

  describe("checkItem()", function () {
    it("should perform a put request with the index and check status", function () {
      var request = nock("http://localhost")
        .put("/items/1?checked=true")
        .reply(200);

      ItemsService.checkItem(1, true);

      request.isDone().should.equal(true);
    });
  });

  describe("removeItem()", function () {
    it("should perform a delete request with the index", function () {
      var request = nock("http://localhost")
        .delete("/items/1")
        .reply(200);

      ItemsService.removeItem(1);

      request.isDone().should.equal(true);
    });
  });
});
