/**
 * 文件描述
 * @author ydr.me
 * @create 2015-11-07 13:57
 */


'use strict';

var assert = require('assert');
var path = require('ydr-utils').path;

var parseCache = require('../../utils/parse-cache.js');

describe('utils/parse-cache.js', function () {
    var file = path.join(__dirname, Math.random());

    it('get', function () {
        var b = parseCache.get(file, {
            srcDirname: __dirname
        });

        assert.deepEqual(b, [false]);
    });

    it('set', function () {
        var b = parseCache.set(file, {
            srcDirname: __dirname
        });

        assert.equal(b, true);
    });
});
