/**
 * 文件描述
 * @author ydr.me
 * @create 2015-12-14 00:04
 */


'use strict';


var npm = require('ydr-utils').npm;
var debug = require('ydr-utils').debug;

var pkg = require('../package.json');

module.exports = function () {
    debug.success('local version', pkg.version);
    debug.ignore('check version', 'wait a moment...');
    npm.getLatestVersion(pkg.name, function (err, version, json) {
        if (err) {
            debug.error('online version', err.message);
            return process.exit(1);
        }

        debug.success('online version', version);
    });
};





