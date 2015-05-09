'use strict';

var assert = require('chai').assert,
    ndarray = require('ndarray'),
    basis = require('../index.js'),
    ndt = require('ndarray-tests');

describe('basis',function() {

  var x, f1, f2;

  beforeEach(function() {
    x = ndarray([1,2,3]);
    f1 = function(x) {return 1;}
    f2 = function(x) {return x;}
  });

  it('constructs a basis with correct dimension',function() {
    var A = basis(x, [f1, f2]);
    assert.equal( 2, A.dimension )
  });

  it('constructs a basis with correct shape',function() {
    var A = basis(x, [f1, f2]);
    assert.deepEqual( [3,2], A.shape );
  });

  it('defaults to array dtype',function() {
    var A = basis(x, [f1, f2]);
    assert.equal(A.dtype, 'array');
  });

  it('permits a custom dtype',function() {
    var A = basis(x, [f1, f2], 'float64');
    assert.equal(A.dtype, 'float64');
  });

  it('throws a TypeError if not given an array',function() {
    assert.throws(function() {
      var A = basis(x, 7);
    }, TypeError, /must be a list of functions/);
  });

  it('throws a TypeError if given something that\'s not a function',function() {
    assert.throws(function() {
      var A = basis(x, [f1, f2, 3]);
    }, TypeError, /must be a list of functions/);
  });

  it('returns a basis with the correct values',function() {
    var result = basis(x,[f1,f2]);
    var expectedResult = ndarray([1,1,1,2,1,3],[3,2]);
    assert( ndt.approximatelyEqual( result, expectedResult, 0 ) );
  });
});

