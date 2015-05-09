# ndarray-function-basis

Construct an ndarray basis given a sequence of points and functions

## Introduction

This module extends the idea of a [Vandermonde matrix](http://en.wikipedia.org/wiki/Vandermonde_matrix) to a sequence of arbitrary functions. It constructs a set of basis vectors that can be used in a least squares curve fit.

## Usage

`basis( x, functions [, dtype])`

- `x`: a vector of numbers for the independent variable at which the functions are evaluated
- `functions`: an `Array` of functions that take a `Number` as input and return a `Number` as output
- `dtype` (optional): the datatype of the output array, as listed in the [ndarray documentation](https://www.npmjs.com/package/ndarray).


## Example

For example, to construct a sinusoidal basis with period `2*pi` and a constant offset,

```
var basis = require('ndarray-function-basis'),
    ndarray = require('ndarray');

var x = ndarray([1,2,3,4]);

var f1 = function(x) { return 1; }
var f3 = Math.sin;
var f4 = Math.cos;

var y = basis(x, [f1, f2, f3]);
```

## See also:

[ndarray-householder-qr](https://www.npmjs.com/package/ndarray-householder-qr): Householder QR for least squares curve-fitting
[ndarray-vandermonde](https://www.npmjs.com/package/ndarray-vandermonde): Construct a Vandermonde (polynomial) basis

## Credits
(c) 2015 Ricky Reusser. MIT License
