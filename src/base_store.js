/* eslint-env node */

"use strict";

var EventEmitter = require("wolfy87-eventemitter");

var Dispatcher = require("./dispatcher");

module.exports = class extends EventEmitter {
  register () {
    this.id = Dispatcher.register((action) => {
      if (typeof this.handleEvent === "function") {
        this.handleEvent(action);
      } else {
        throw new Error("No event handler available");
      }
    });
  }

  unregister () {
    Dispatcher.unregister(this.id);
  }

  getId () {
    return this.id;
  }

  emitChange () {
    this.emit("change");
  }

  addChangeListener (callback) {
    this.on("change", callback);
  }

  removeChangeListener (callback) {
    this.removeListener("change", callback);
  }
};
