var assert = require('assert');
require('es6-shim');
var _ = require('../index.umd');

describe('bindRight', function() {
    it('binds a function with argument list that will be evaluated on the right', function() {
        var values = [];
        var fn = function(a, b, c) {
            values = [a, b, c];
        };
        _.bindRight(fn, null, 1, 2)(3);
        assert.equal(values[0], 3);
        assert.equal(values[1], 1);
        assert.equal(values[2], 2);
    });
});
