/* eslint-env node */

"use strict";

var FormActions = require("./actions");

var Dispatcher = require("../../dispatcher");

module.exports = {
  changeField: function (formValue) {
    Dispatcher.dispatch({
      type: FormActions.CHANGE_FIELD,
      formValue: formValue
    });
  }
};
