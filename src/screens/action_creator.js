/* eslint-env node */

"use strict";

var Dispatcher = require("../dispatcher");

var ApplicationActions = require("./actions");

var ItemsService = require("./items/service");

module.exports = {
  start: function () {
    Dispatcher.dispatch({
      type: ApplicationActions.START
    });

    ItemsService.getItems().then(function (items) {
      Dispatcher.dispatch({
        type: ApplicationActions.LOADED,
        items: items
      });
    });
  }
};
