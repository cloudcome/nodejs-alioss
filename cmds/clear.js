/**
 * clear cache
 * @author ydr.me
 * @create 2015-12-14 00:05
 */


'use strict';

var fse = require('fs-extra');
var path = require('ydr-utils').path;
var debug = require('ydr-utils').debug;

var cacheName = 'alioss.cache.log';

module.exports = function (options) {
    var destCacheFile = path.join(options.srcDirname, cacheName);

    try {
        fse.removeSync(destCacheFile);
        debug.success('clear cache', 'success');
    } catch (err) {
        debug.error('clear cache', path.toSystem(destCacheFile));
        debug.error('clear cache', err.message);
        return process.exit(1);
    }
};




