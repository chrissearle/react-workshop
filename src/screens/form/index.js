/* eslint-env node */

"use strict";

var React = require("react");

var Form = require("./component");

var FormStore = require("./store");

var FormActionCreator = require("./action_creator");

var ItemsActionCreator = require("./../items/action_creator");

function getState () {
  return {
    formValue: FormStore.getFormValue()
  };
}

module.exports = React.createClass({
  displayName: "FormPage",

  getInitialState: function () {
    return getState();
  },

  onStateChange: function () {
    this.setState(getState());
  },

  componentDidMount: function () {
    FormStore.addChangeListener(this.onStateChange);
  },

  componentWillUnmount: function () {
    FormStore.removeChangeListener(this.onStateChange);
  },

  onChange: function (formValue) {
    FormActionCreator.changeField(formValue);
  },

  onAdd: function (formValue) {
    ItemsActionCreator.addItem(formValue);
  },

  render: function () {
    return <Form onChange={this.onChange} onAdd={this.onAdd} {...this.state} />;
  }
});
