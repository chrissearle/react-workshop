/* eslint-env node */

"use strict";

var FormActions = require("./actions");

var FormService = require("./service");

var Dispatcher = require("../dispatcher");

module.exports = {
  blurField: function (formValue) {
    FormService.saveFormValue(formValue);
  },

  changeField: function (formValue) {
    Dispatcher.dispatch({
      type: FormActions.CHANGE_FIELD,
      formValue: formValue
    });
  }
};
