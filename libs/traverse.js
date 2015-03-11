/*!
 * 文件描述
 * @author ydr.me
 * @create 2015-03-11 18:14
 */

'use strict';

var fs = require('fs');
var path = require('path');
var glob = require('glob');
var howdo = require('howdo');
var typeis = require('ydr-util').typeis;
var log = require('./log.js');
var REG_IGNORE = /^\./;


/**
 * 遍历目录
 * @param dir {String} 绝对目录
 * @param options {Object} 配置
 * @param callback {Function} 配置
 * @returns {Array}
 */
module.exports = function traverse(dir, options, callback) {
    var files = [];

    howdo.each(options.upload, function (index, gb, done) {
        gb = path.join(dir, options.src, gb);
        glob(gb, {dot: false, nodir: true}, function (err, files2) {
            if (err) {
                log('glob files', gb, 'error');
                log('glob files', err.message, 'error');
                return process.exit();
            }

            files = files.concat(files2);
            done(err);
        });
    }).together(function (err) {
        var groups = [];
        var len = files.length;

        while (files.length) {
            groups.push(files.splice(0, options.parallel));
        }

        callback(err, groups, len);
    });
};
