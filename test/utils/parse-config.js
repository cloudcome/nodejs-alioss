/**
 * 文件描述
 * @author ydr.me
 * @create 2015-11-07 13:57
 */


'use strict';

var assert = require('assert');
var typeis = require('ydr-utils').typeis;

var parseConfig = require('../../utils/parse-config.js');

describe('utils/parse-config.js', function () {
    it('e', function () {
        var configs = parseConfig({
            srcDirname: __dirname
        });

        assert.equal(typeis.directory(configs.srcDirname), true);
    });
});
