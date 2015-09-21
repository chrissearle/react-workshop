/* eslint-env node */

"use strict";

var BaseStore = require("../base_store");

var FormActions = require("./actions");

var ItemsActions = require("../items/actions");

var ApplicationActions = require("../application/actions");

module.exports = class extends BaseStore {
  constructor () {
    super();

    this.formValue = "";
  }

  getFormValue () {
    return this.formValue;
  }

  handleEvent (event) {
    switch (event.type) {
      case ApplicationActions.LOADED:
        this.formValue = event.formValue;
        break;

      case FormActions.CHANGE_FIELD:
        this.formValue = event.formValue;
        break;

      case ItemsActions.ADD_ITEM:
        this.formValue = "";
        break;

      default:
        return;
    }

    this.emitChange();
  }
};
