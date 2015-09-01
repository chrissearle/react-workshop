/* eslint-env node */

"use strict";

var React = require("react");

module.exports = React.createClass({
  displayName: "Items",

  propTypes: {
    isLoading: React.PropTypes.bool,
    items: React.PropTypes.array,
    onRemove: React.PropTypes.func
  },

  onRemove: function (iItem) {
    this.props.onRemove(iItem);
  },

  render: function () {
    if (this.props.isLoading) {
      return <p>Loading items..</p>;
    } else {
      return (
        <ul id="items">
          {(this.props.items || []).map(function (item, i) {
            return (
              <li key={i}>
                {item}

                <button onClick={this.onRemove.bind(null, i)}>
                  Delete
                </button>
              </li>
            );
          }, this)}
        </ul>
      );
    }
  }
});
