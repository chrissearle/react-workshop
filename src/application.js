/* eslint-env browser, node */

"use strict";

var React = require("react");

var ApplicationCreator = require("./application/action_creator");

var FormStore = require("./form/store");

var FormActionCreator = require("./form/action_creator");

var Items = require("./items/component");

var ItemsStore = require("./items/store");

var ItemsActionCreator = require("./items/action_creator");

function renderApplication () {
  var state = {
    formValue: FormStore.getFormValue(),
    onChange: FormActionCreator.changeField,
    isLoading: ItemsStore.getIsLoading(),
    items: ItemsStore.getItems(),
    onAdd: ItemsActionCreator.addItem,
    onRemove: ItemsActionCreator.removeItem
  };

  React.render(<Items {...state} />, document.getElementById("todo-application"));
}

FormStore.register();
ItemsStore.register();

FormStore.addChangeListener(renderApplication);
ItemsStore.addChangeListener(renderApplication);

ApplicationCreator.start();
