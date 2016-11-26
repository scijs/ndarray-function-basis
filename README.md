# ndarray-function-basis

[![Build Status](https://travis-ci.org/scijs/ndarray-function-basis.svg)](https://travis-ci.org/scijs/ndarray-function-basis) [![npm version](https://badge.fury.io/js/ndarray-function-basis.svg)](http://badge.fury.io/js/ndarray-function-basis) [![Dependency Status](https://david-dm.org/scijs/ndarray-function-basis.svg)](https://david-dm.org/scijs/ndarray-function-basis)

> Construct an basis ndarray given a list of values and functions

## Introduction

This module extends the [Vandermonde matrix](http://en.wikipedia.org/wiki/Vandermonde_matrix) to a list of numbers or functions. It constructs a set of basis vectors that can be used in a least squares curve fit. It's little more than a thin convenience wrapper around [ndarray-fill](https://github.com/scijs/ndarray-fill).

## Usage

#### `require([dest, ]x, inputs)`

- `dest`: a destination array. If not provided, an [`ndarray` of type `'array'`](https://github.com/scijs/ndarray#arraydtype) will be created. If provided, the first dimension must match the length of `x`, and the second must match the length of `inputs`.
- `x`: a ndarray of numbers at which the inputs are evaluated
- `inputs`: an `Array` of either `Functions` or `Numbers`. If a `Function`, it is evaluated at `x`; if a `Number`, `x` is ignored for this input.

## Example

For example, to construct a sinusoidal basis with period `2 * π` and a constant offset,

```
var basis = require('ndarray-function-basis');
var ndarray = require('ndarray');

basis(ndarray([1, 2, 3, 4]), [1, Math.sin, Math.cos]);
// => 
//  1.000    0.841    0.540
//  1.000    0.909   -0.416
//  1.000    0.141   -0.990
//  1.000   -0.757   -0.654
```

## See also:

- [ndarray-householder-qr](https://www.npmjs.com/package/ndarray-householder-qr): Householder QR for least squares curve-fitting
- [ndarray-vandermonde](https://www.npmjs.com/package/ndarray-vandermonde): Construct a Vandermonde (polynomial) basis

## Credits
(c) 2015 Ricky Reusser. MIT License
