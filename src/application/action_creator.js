/* eslint-env node */

"use strict";

var Dispatcher = require("../dispatcher");

var ApplicationActions = require("./actions");

var ItemsService = require("../items/service");

var FormService = require("../form/service");

var Promise = require("bluebird");

module.exports = {
    start: function () {
        Dispatcher.dispatch({
            type: ApplicationActions.START
        });

        Promise.all([
            ItemsService.getItems(),
            FormService.getFormValue()
        ]).spread(function (items, formValue) {
            Dispatcher.dispatch({
                type: ApplicationActions.LOADED,
                items: items,
                formValue: formValue
            });
        });
    }
};
