var basis = require('../');
var ndarray = require('ndarray');
var show = require('ndarray-show');

var y = basis(ndarray([1, 2, 3, 4]), [1, Math.sin, Math.cos]);

console.log(show(y));
// y =>
//  1.000    0.841    0.540
//  1.000    0.909   -0.416
//  1.000    0.141   -0.990
//  1.000   -0.757   -0.654
