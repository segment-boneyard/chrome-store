
/**
 * Module dependencies.
 */

var debug = require('debug')('chrome-store');
var Emitter = require('emitter');
var storage = chrome.storage;
var runtime = chrome.runtime;

/**
 * Export `Store`
 */

module.exports = Store;

/**
 * Initialize a new `Store`.
 *
 * @param {String} type
 * @api public
 */

function Store(type){
  if (!(this instanceof Store)) return new Store(type);
  this.type = type || 'local';
  this.keys = [];
  this.obj = {};
}

/**
 * Mixins
 */

Emitter(Store);

/**
 * Set `key`, `value`.
 *
 * @param {String} key
 * @param {Mixed} value
 * @api public
 */

Store.prototype.set = function(key, value, fn){
  this.obj[key] = value;
  if (fn) this.end(fn);
  return this;
};

/**
 * Get `key`.
 *
 * @param {String} key
 * @api public
 */

Store.prototype.get = function(key, fn){
  this.keys.push(key);
  if (fn) this.end(fn);
  return this;
};

/**
 * End.
 *
 * @param {Function} fn
 * @api public
 */

Store.prototype.end = function(fn){
  var type = this.type;
  var keys = this.keys;
  var set = this.obj;

  // get
  if (keys.length) {
    debug('get %o', keys);
    this.keys = [];
    storage[type].get(keys, done);
    return;
  }

  // set
  this.obj = {};
  debug('set %o', set);
  storage[type].set(set, done);

  // done
  function done(value){
    var args = [].slice.call(arguments);
    var err = runtime.lastError;
    var key = keys[0];
    if (err) return fn(err);
    if (1 == length) return fn(null, value[key]);
    fn.apply(null, [null].concat(args));
  }
};
