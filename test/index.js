/* globals it, describe, beforeEach */
'use strict';

var assert = require('chai').assert;
var ndarray = require('ndarray');
var basis = require('../index.js');
var ndt = require('ndarray-tests');

describe('ndarray-function-basis', function () {
  var x, f1, f2, dest, input;
  var notAnNdarray;
  var notAnArray;

  beforeEach(function () {
    notAnNdarray = [7, 'x', function () {}, null, undefined, []];
    notAnArray = [7, 'x', function () {}, null, undefined, ndarray([1, 2, 3])];
    x = ndarray([1, 2, 3]);
    input = ndarray([], [x.shape[0], 2]);
    f1 = function (x) { return 1; };
    f2 = function (x) { return x; };
  });

  describe('basis(output, x, funcs)', function () {
    describe('input validation', function () {
      it('fails if first arg is not an ndarray', function () {
        for (var i = 0; i < notAnNdarray.length; i++) {
          assert.throws(function () {
            basis(notAnNdarray[i], x, []);
          }, Error, /first argument must be a ndarray/);
        }
      });

      it('fails if second arg is not an ndarray', function () {
        for (var i = 0; i < notAnNdarray.length; i++) {
          assert.throws(function () {
            basis(input, notAnNdarray[i], []);
          }, Error, /second argument must be a ndarray/);
        }
      });

      it('fails if num of funcs != dim x', function () {
        assert.throws(function () {
          basis(input, ndarray([1, 2, 3, 4]), [f1, f2]);
        }, Error, /first dimension of destination array must match length of x/);
      });

      it('fails if num of funcs != dim input', function () {
        assert.throws(function () {
          basis(input, x, [f1, f2, f2]);
        }, Error, /second dimension of destination array must match the number of functions/);
      });

      it('throws a TypeError if given something that\'s not a function', function () {
        assert.throws(function () {
          basis(input, x, [f1, 'x']);
        }, TypeError, /Expected an Array of functions or numbers/);
      });
    });

    it('constructs a basis with correct dimension', function () {
      dest = basis(input, x, [f1, f2]);
      assert.equal(dest.dimension, 2);
    });

    it('constructs a basis with correct shape', function () {
      dest = basis(input, x, [f1, f2]);
      assert.deepEqual(dest.shape, [3, 2]);
    });

    it('returns a basis with the correct values', function () {
      dest = basis(input, x, [f1, f2]);
      var expectedResult = ndarray([1, 1, 1, 2, 1, 3], [3, 2]);
      assert(ndt.approximatelyEqual(dest, expectedResult, 0));
    });

    it('returns a basis from numerical input', function () {
      dest = basis(input, x, [8, 2]);
      var expectedResult = ndarray([8, 2, 8, 2, 8, 2], [3, 2]);
      assert(ndt.approximatelyEqual(dest, expectedResult, 0));
    });
  });

  describe('basis(x, funcs)', function () {
    describe('input validation', function () {
      it('fails if first arg is not an ndarray', function () {
        for (var i = 0; i < notAnNdarray.length; i++) {
          assert.throws(function () {
            basis(notAnNdarray[i], []);
          }, Error, /when given two arguments, first argument must be a ndarray/);
        }
      });

      it('fails if second arg is not an array', function () {
        for (var i = 0; i < notAnArray.length; i++) {
          assert.throws(function () {
            basis(x, notAnArray[i]);
          }, Error, /when given two arguments, second argument must be an Array of functions/);
        }
      });

      it('throws a TypeError if given something that\'s not a function or number', function () {
        for (var i = 0; i < notAnArray.length; i++) {
          assert.throws(function () {
            basis(x, [f1, 'x']);
          }, TypeError, /Expected an Array of functions or numbers/);
        }
      });
    });

    it('constructs a basis with correct dimension', function () {
      var dest = basis(x, [f1, f2]);
      assert.equal(dest.dimension, 2);
    });

    it('constructs a basis with correct shape', function () {
      var dest = basis(x, [f1, f2]);
      assert.deepEqual(dest.shape, [3, 2]);
    });

    it('returns a basis with the correct values', function () {
      var dest = basis(x, [f1, f2, 7]);
      var expectedResult = ndarray([1, 1, 7, 1, 2, 7, 1, 3, 7], [3, 3]);
      assert(ndt.approximatelyEqual(dest, expectedResult, 0));
    });
  });
});
