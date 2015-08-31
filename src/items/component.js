/* eslint-env node */

"use strict";

var React = require("react");

module.exports = React.createClass({
  displayName: "Items",

  propTypes: {
    formValue: React.PropTypes.string,
    isLoading: React.PropTypes.bool,
    items: React.PropTypes.array,
    onAdd: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onRemove: React.PropTypes.func
  },

  onAdd: function () {
    this.props.onAdd(this.props.formValue);
  },

  onCheck: function (iItem, e) {
    this.props.onCheck(iItem, e.target.checked);
  },

  onChange: function (e) {
    this.props.onChange(e.target.value);
  },

  onRemove: function (iItem) {
    this.props.onRemove(iItem);
  },

  render: function () {
    return (
      <div>
        <h1>Items</h1>

        {this.props.isLoading &&
          <p>Loading items..</p>}

        {!this.props.isLoading &&
          <ul>
            {(this.props.items || []).map(function (item, i) {
              return (
                <li key={i}>
                  {item.value}

                  <button onClick={this.onRemove.bind(null, i)}>
                    Delete
                  </button>

                  <label>
                    <input type="checkbox" checked={item.checked} onChange={this.onCheck.bind(null, i)} /> Done?
                  </label>
                </li>
              );
            }, this)}
          </ul>}

        <textarea value={this.props.formValue} onChange={this.onChange} />
        <button onClick={this.onAdd}>Add</button>
      </div>
    );
  }
});
