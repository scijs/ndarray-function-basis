'use strict';

var zeros = require('zeros'),
    fill = require('ndarray-fill');

module.exports = function( x, functions, dtype ) {

  var i, m, n, v;

  if( x.dimension !== 1 ) {
    throw new TypeError('ndarray-function-basis():: error: x must be a dimension-1 vector.');
  }

  if( ! Array.isArray(functions) ) {
    throw new TypeError('ndarray-function-basis:: Second argument must be a list of functions.');
  }

  for(i = functions.length-1; i>=0; i--) {
    if( typeof functions[i] !== 'function' ) {
      throw new TypeError('ndarray-function-basis():: Second argument must be a list of functions');
    }
  }

  m = x.shape[0];
  n = functions.length;
  dtype = arguments[2] || 'array';
  v = zeros([m,n],dtype);

  fill(v,function(i,j) {
    return (functions[j])( x.get(i) );
  });
  
  return v;
};
