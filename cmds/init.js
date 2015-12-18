/**
 * init json file
 * @author ydr.me
 * @create 2015-12-14 00:05
 */



'use strict';

var fse = require('fs-extra');
var path = require('ydr-utils').path;
var typeis = require('ydr-utils').typeis;
var debug = require('ydr-utils').debug;

var json = {
    accessKeyId: 'your_accessKeyId',
    accessKeySecret: 'your_accessKeySecret',
    bucket: 'your_bucket',
    host: 'oss-cn-hangzhou.aliyuncs.com',
    src: './',
    upload: [
        './**'
    ],
    dest: '/test/',
    // 并行数量
    parallel: 10,
    cacheControl: 'public',
    expires: 31536000,
    contentType: 'application/octect-stream',
    https: true,
    // 上传前图片压缩
    image: {
        minify: false,
        // http://zhitu.isux.us/
        processor: 'zhitu',
        // 0.1 - 1
        quality: 0.7
    }
};
var JSONFileName = 'alioss.json';


/**
 * init configs json file
 * @param options
 * @returns {*}
 */
module.exports = function (options) {
    var destJSONFile = path.join(options.srcDirname, JSONFileName);

    if (typeis.file(destJSONFile)) {
        debug.error(JSONFileName, path.toSystem(destJSONFile) + ' is exist');
        return process.exit(1);
    }

    try {
        fse.outputFileSync(destJSONFile, JSON.stringify(json, null, 4));
        debug.success(JSONFileName, path.toSystem(destJSONFile));
    } catch (err) {
        debug.error(JSONFileName, path.toSystem(destJSONFile));
        debug.error('write file', err.message);
        return process.exit(1);
    }

    return destJSONFile;
};




