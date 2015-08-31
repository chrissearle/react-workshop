/* eslint-env node */

"use strict";

var ItemsActions = require("./actions");

var ItemsService = require("./service");

var Dispatcher = require("../dispatcher");

module.exports = {
  addItem: function (item) {
    ItemsService.addItem(item).then(function () {
      Dispatcher.dispatch({
        type: ItemsActions.ADD_ITEM,
        item: item
      });
    });
  },

  removeItem: function (iItem) {
    ItemsService.removeItem(iItem).then(function () {
      Dispatcher.dispatch({
        type: ItemsActions.REMOVE_ITEM,
        iItem: iItem
      });
    });
  }
};
