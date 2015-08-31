/* eslint-env node */

"use strict";

var Promise = require("bluebird");

var Superagent = require("superagent");

module.exports = {
  getFormValue: function () {
    return new Promise(function (resolve) {
      Superagent.get("/form").end(function (error, response) {
        resolve(response.text);
      });
    });
  },

  saveFormValue: function (formValue) {
    return new Promise(function (resolve) {
      Superagent.post("/form?formValue=" + formValue).end(resolve);
    });
  }
};
