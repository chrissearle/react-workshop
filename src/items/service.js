/* eslint-env node */

"use strict";

var Promise = require("bluebird");

var Superagent = require("superagent");

module.exports = {
  getItems: function () {
    return new Promise(function (resolve) {
      Superagent.get("/items").end(function (error, response) {
        resolve(JSON.parse(response.text));
      });
    });
  },

  addItem: function (item) {
    return new Promise(function (resolve) {
      Superagent.post("/items?item=" + item).end(resolve);
    });
  },

  checkItem: function (iItem, checked) {
    return new Promise(function (resolve) {
      Superagent.put("/items/" + iItem + "?checked=" + checked).end(resolve);
    });
  },

  removeItem: function (iItem) {
    return new Promise(function (resolve) {
      Superagent.del("/items/" + iItem).end(resolve);
    });
  }
};
