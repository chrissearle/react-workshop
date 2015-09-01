/* eslint-env node */

"use strict";

var React = require("react");

module.exports = React.createClass({
  displayName: "Form",

  propTypes: {
    formValue: React.PropTypes.string,
    onAdd: React.PropTypes.func,
    onChange: React.PropTypes.func
  },

  onAdd: function () {
    this.props.onAdd(this.props.formValue);
  },

  onChange: function (e) {
    this.props.onChange(e.target.value);
  },

  render: function () {
    return (
      <div>
        <textarea value={this.props.formValue} onChange={this.onChange} />
        <button onClick={this.onAdd}>Add</button>
      </div>
    );
  }
});
