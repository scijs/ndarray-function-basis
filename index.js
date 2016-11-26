'use strict';

var fill = require('ndarray-fill');
var isndarray = require('isndarray');
var ndarray = require('ndarray');
var isnumber = require('validate.io-number');

module.exports = function (output, x, inputs) {
  if (arguments.length === 3) {
    if (!isndarray(output)) {
      throw new TypeError('ndarray-function-basis: when given three arguments, first argument must be a ndarray');
    }

    if (!isndarray(x)) {
      throw new TypeError('ndarray-function-basis: when given three arguments, second argument must be a ndarray');
    }

    if (!Array.isArray(inputs)) {
      throw new TypeError('ndarray-function-basis: when given three arguments, third argument must be an Array of functions');
    }

    if (output.shape[0] !== x.shape[0]) {
      throw new Error('ndarray-function-basis: first dimension of destination array must match length of x');
    }

    if (output.shape[1] !== inputs.length) {
      throw new Error('ndarray-function-basis: second dimension of destination array must match the number of functions');
    }
  } else if (arguments.length === 2) {
    // output vector needs to be created:
    inputs = x;
    x = output;

    if (!isndarray(x)) {
      throw new TypeError('ndarray-function-basis: when given two arguments, first argument must be a ndarray');
    }

    if (!Array.isArray(inputs)) {
      throw new TypeError('ndarray-function-basis: when given two arguments, second argument must be an Array of functions');
    }

    output = ndarray([], [x.shape[0], inputs.length]);
  }

  if (x.dimension !== 1) {
    throw new TypeError('ndarray-function-basis: x must be a ndarray with dimension 1.');
  }

  var functions = [];
  for (var i = inputs.length - 1; i >= 0; i--) {
    if (isnumber(inputs[i])) {
      // Create a closure so we can pass the number to cwise:
      functions[i] = (function (ii) { return function () { return inputs[ii]; }; })(i);
    } else if (typeof inputs[i] === 'function') {
      functions[i] = inputs[i];
    } else {
      throw new TypeError('ndarray-function-basis: Expected an Array of functions or numbers');
    }
  }

  fill(output, function (i, j) {
    return functions[j](x.get(i));
  });

  return output;
};
