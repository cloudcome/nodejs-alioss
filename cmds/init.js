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
    access_key: 'your_access_key',
    secret_key: 'your_secret_key',
    bucket: 'your_bucket',
    src: './',
    upload: ['./**'],
    dest: '/test/',
    // 并行数量
    parallel: 10,
    contentType: 'application/octect-stream'
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




