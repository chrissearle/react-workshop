/* eslint-env node */

"use strict";

var React = require("react");

var Items = require("./component");

var ItemsStore = require("./store");

var ItemsActionCreator = require("./action_creator");

function getState () {
  return {
    isLoading: ItemsStore.getIsLoading(),
    items: ItemsStore.getItems()
  };
}

module.exports = React.createClass({
  displayName: "ItemsPage",

  getInitialState: function () {
    return getState();
  },

  onStateChange: function () {
    this.setState(getState());
  },

  componentDidMount: function () {
    ItemsStore.addChangeListener(this.onStateChange);
  },

  componentWillUnmount: function () {
    ItemsStore.removeChangeListener(this.onStateChange);
  },

  onRemove: function (iItem) {
    ItemsActionCreator.removeItem(iItem);
  },

  render: function () {
    return <Items onRemove={this.onRemove} {...this.state} />;
  }
});
