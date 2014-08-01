var assert = require('assert');
require('es6-shim');
var _ = require('../index.umd');

describe('bindLeft', function() {
    it('binds a function with argument list that will be evaluated on the left', function() {
        var values = [];
        var fn = function(a, b, c) {
            values = [a, b, c];
        };
        _.bindLeft(null, fn, 1, 2)(3);
        assert.equal(values[0], 1);
        assert.equal(values[1], 2);
        assert.equal(values[2], 3);
    });
});
