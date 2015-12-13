/**
 * 文件描述
 * @author ydr.me
 * @create 2015-11-07 14:20
 */


'use strict';

var assert = require('assert');
var path = require('ydr-utils').path;
var aliOSS = require('ydr-utils').aliOSS;

var upload = require('../../utils/upload.js');

var configs= require('./alioss.json');

aliOSS.config({
    accessKeyId: configs.accessKeyId,
    accessKeySecret: configs.accessKeySecret,
    bucket: configs.bucket,
    host: configs.host,
    cacheControl: configs.cacheControl,
    // 1年，单位 秒
    expires: configs.expires,
    domain: '',
    // 保存目录
    dirname: configs.dest,
    // 生成资源链接协议
    https: configs.https
});
describe('utils/upload.js', function () {
    it('e', function (done) {
        upload(__filename, {
            srcDirname: __dirname,
            destDirname: '_test'
        }, function () {
            console.log(arguments);
            done();
        });
    });
});



