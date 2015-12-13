/**
 * parse 7niu.json
 * @author ydr.me
 * @create 2015-11-07 12:58
 */


'use strict';

var glob = require('glob');
var path = require('ydr-utils').path;
var typeis = require('ydr-utils').typeis;
var debug = require('ydr-utils').debug;


/**
 * parse 7niu.json
 * @param options {Object} 配置
 * @param options.srcDirname {String} 原始目录
 * @returns {Object}
 */
module.exports = function (options) {
    var dest7NiuJSONPath = path.join(options.srcDirname, '7niu.json');

    if (!typeis.file(dest7NiuJSONPath)) {
        debug.error('7niu.json', path.toSystem(dest7NiuJSONPath) + ' is NOT a file');
        return process.exit(1);
    }

    var json = require(dest7NiuJSONPath);
    var srcDirname = path.join(options.srcDirname, json.src);
    var uploadFiles = path.glob(json.upload, {
        srcDirname: srcDirname
    });

    return {
        accessKey: json.access_key,
        secretKey: json.secret_key,
        bucket: json.bucket,
        srcDirname: srcDirname,
        uploadFiles: uploadFiles,
        destDirname: json.dest,
        parallel: json.parallel
    };
};
