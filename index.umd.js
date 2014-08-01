(function(root, factory) {
    if(typeof exports === 'object') {
        module.exports = factory();
    }
    else if(typeof define === 'function' && define.amd) {
        define('esdash', [], factory);
    }
    else {
        root['esdash'] = factory();
    }
}(this, function() {

var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var primitiveTypes = ['number', 'string', 'boolean'];

var hasOwn = Object.prototype.hasOwnProperty;

var _flatten = function(array) {
    var flat = [];
    array.forEach(function(item) {
        if(Array.isArray(item)) {
            flat.push.apply(flat, _flatten(item));
        } else {
            flat.push(item);
        }
    });
    return flat;
};
var _undefined;
var _ = {
    all: function() {
        var funs = Array.from(arguments);
        return function() {
            var args = Array.from(arguments);
            funs = _.flatten(funs);
            funs.forEach(function(fun) {
                fun.apply(null, args);
            });
        };
    },
    bindLeft: function(obj, fn) {
        if(typeof fn === 'string') {
            fn = obj[fn];
        }
        var args = Array.from(arguments);
        args.shift();
        return fn.bind.apply(fn, args);
    },
    bindRight: function(obj, fn) {
        if(typeof fn === 'string') {
            fn = obj[fn];
        }
        var args = Array.from(arguments);
        args.shift();
        args.shift();
        return function() {
            return fn.apply(obj, Array.from(arguments).concat(args));
        };
    },
    copy: function(source, target) {
        var i, j, found;
        for (i in source) {
            if (hasOwn.call(source, i)) {
                if (hasOwn.call(target, i)) {
                    if (primitiveTypes.indexOf(typeof source[i]) < 0) {
                        if (source[i] === null) {
                            target[i] = null;
                        } else {
                            _.copy(source[i], target[i]);
                        }
                    } else {
                        target[i] = source[i];
                    }
                } else {
                    target[i] = source[i];
                }
            }
        }
        for (i in target) {
            if (hasOwn.call(target, i) && !hasOwn.call(source, i)) {
                delete target[i];
            }
        }
    },
    dateRFC1123: function(time) {
        var date = typeof time === 'undefined' ? new Date() : new Date(time);
        return days[date.getUTCDay()] + ', ' +
                _.pad(String(date.getUTCDate()), true, 2, '0') + ' ' +
                month[date.getUTCMonth()] + ' ' +
                _.pad(String(date.getUTCFullYear()), true, 4, '0') + ' ' +
                _.pad(String(date.getUTCHours()), true, 2, '0') + ':' +
                _.pad(String(date.getUTCMinutes()), true, 2, '0') + ':' +
                _.pad(String(date.getUTCSeconds()), true, 2, '0') + ' ' +
                'GMT';
    },
    extend: function() {
        var sources = Array.from(arguments);
        var target = sources.shift();
        sources.forEach(function(source) {
            Object.keys(source).forEach(function(key) {
                target[key] = source[key];
            });
        });
        return target;
    },
    flatten: function() {
        return _flatten(Array.from(arguments));
    },
    noop: function() {
    },
    notEmpty: function(item) {
        return item.length > 0;
    },
    pad: function(string, rightAlign, length, char) {
        var paddedString = '';
        if(!rightAlign) {
            paddedString += string;
        }
        var n = length - string.length;
        while(n > 0) {
            paddedString += char;
            n -= 1;
        }
        if(rightAlign) {
            paddedString += string;
        }
        return paddedString;
    },
    pass: function(value) {
        return value;
    },
    undefined: _undefined,
    unique: function() {
        var values = _flatten(Array.from(arguments));
        var map = new Map();
        return values.filter(function(value) {
            if(map.has(value)) {
                return false;
            }
            map.set(value, 1);
            return true;
        });
    },
    zip: function(arrays) {
        var keys = Object.keys(arrays);
        var array = [];
        var key = keys[0];
        arrays[key].forEach(function(value) {
            var object = {};
            object[key] = value;
            array.push(object);
        });
        keys.shift();
        keys.forEach(function(key) {
            arrays[key].forEach(function(value, i) {
                array[i][key] = value;
            });
        });
        return array;
    }
};


return _;

}));
