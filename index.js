var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var primitiveTypes = ['number', 'string', 'boolean'];

var hasOwn = Object.prototype.hasOwnProperty;

var _ = {
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
                exports.pad(String(date.getUTCDate()), true, 2, '0') + ' ' +
                month[date.getUTCMonth()] + ' ' +
                exports.pad(String(date.getUTCFullYear()), true, 4, '0') + ' ' +
                exports.pad(String(date.getUTCHours()), true, 2, '0') + ':' +
                exports.pad(String(date.getUTCMinutes()), true, 2, '0') + ':' +
                exports.pad(String(date.getUTCSeconds()), true, 2, '0') + ' ' +
                'GMT';
    },
    extend: function() {
        var sources = [].slice.call(arguments);
        var target = sources.shift();
        sources.forEach(function(source) {
            Object.keys(source).forEach(function(key) {
                target[key] = source[key];
            });
        });
        return target;
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
