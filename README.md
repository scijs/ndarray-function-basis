# ndarray-vandermonde

[![Build Status](https://travis-ci.org/scijs/ndarray-vandermonde.svg?branch=1.0.0)](https://travis-ci.org/scijs/ndarray-vandermonde) [![npm version](https://badge.fury.io/js/ndarray-vandermonde.svg)](http://badge.fury.io/js/ndarray-vandermonde)

Construct an ndarray vandermonde matrix

## Introduction

A [Vandermonde matrix](http://en.wikipedia.org/wiki/Vandermonde_matrix) is a matrix with format:

![Vandermonde](/docs/images/vandermonde.png)

It's useful for least squares fits, among other things, in which you want a set of basis vectors that are successive powers of a variable evaluated at specific points. It's usually just plug and chug into QR or SVD in order to solve the least squares problem.

## Usage

`vander( x [, N] [, reversed] )`

`x` is a vector of numbers, `N` is the width of the resulting matrix (i.e. the highest power + 1), and `reversed` is a flag that will reverse the columns of the resulting matrix so that higher powers are on the left.

For example,

```
var vander = require('ndarray-vandermonde'),
    ndarray = require('ndarray');

var x = ndarray(Float64Array([1,2,3,4]));

var y = vander(x);
```


## Credits
(c) 2015 Ricky Reusser. MIT License
