/* eslint-env node */

"use strict";

var FormActions = require("./actions");

var FormService = require("./service");

var Dispatcher = require("../dispatcher");

module.exports = {
  changeField: function (formValue) {
    Dispatcher.dispatch({
      type: FormActions.CHANGE_FIELD,
      formValue: formValue
    });

    // needs to be separate - not wrapping the dispatch - see http://stackoverflow.com/a/28922465
    FormService.setFormValue(formValue);
  }
};
