/**
 * 文件描述
 * @author ydr.me
 * @create 2015-11-07 14:20
 */


'use strict';

var assert = require('assert');
var path = require('ydr-utils').path;

var upload = require('../../utils/upload.js');

describe('utils/upload.js', function () {
    it('e', function (done) {
        upload(__filename, {
            srcDirname: __dirname,
            accessKey: 'x',
            secretKey: 'y',
            bucket: 'static',
            destDirname: '_test'
        }, function () {
            done();
        });
    });
});



