/* eslint-env node */

"use strict";

var BaseStore = require("../base_store");

var ApplicationActions = require("../application/actions");

var ItemsActions = require("./actions");

module.exports = class extends BaseStore {
  constructor () {
    super();

    this.items = [];
  }

  getIsLoading () {
    return this.isLoading;
  }

  getItems () {
    return this.items;
  }

  handleEvent (event) {
    switch (event.type) {
      case ApplicationActions.START:
        this.isLoading = true;
        break;

      case ApplicationActions.LOADED:
        this.isLoading = false;
        this.items = event.items;
        break;

      case ItemsActions.ADD_ITEM:
        this.items.push(event.item);
        break;

      case ItemsActions.REMOVE_ITEM:
        this.items.splice(event.iItem, 1);
        break;

      default:
        return;
    }

    this.emitChange();
  }
};
