/**
 * parse cache
 * @author ydr.me
 * @create 2015-11-07 13:00
 */


'use strict';


var fse = require('fs-extra');
var path = require('ydr-utils').path;
var encryption = require('ydr-utils').encryption;
var dato = require('ydr-utils').dato;
var string = require('ydr-utils').string;
var typeis = require('ydr-utils').typeis;

/**
 * 读取文件内容
 * @param cachePath
 * @private
 */
var getData = function (cachePath) {
    var data = '';

    if (typeis.file(cachePath)) {
        try {
            data = fse.readFileSync(cachePath, 'utf8');
        } catch (err) {
            // ignore
        }
    } else {
        try {
            fse.ensureFileSync(cachePath);
        } catch (err) {
            // ignore
        }
    }

    return data;
};


/**
 * 判断是否匹配
 * @param relative
 * @param version
 * @param data
 * @returns {boolean}
 */
var matches = function (relative, version, data) {
    if (!data) {
        return false;
    }

    var reg = new RegExp('^' + string.escapeRegExp(relative) + '\\t' + string.escapeRegExp(version) + '$', 'm');

    return reg.test(data);
};


/**
 * 匹配文件列表是否存在缓存
 * @param file {String|Array} 待判断文件路径或数组
 * @param options {Object} 配置
 * @param options.srcDirname {String} 原始目录
 * @returns {Array}
 */
exports.get = function (file, options) {
    var cachePath = path.join(options.srcDirname, '7niu.cache.log');
    var data = getData(cachePath);
    var files = typeis.array(file) ? file : [file];
    var ret = [];

    dato.each(files, function (index, file) {
        var relative = path.relative(options.srcDirname, file);
        var version = encryption.etag(file);

        ret.push(matches(relative, version, data));
    });

    return ret;
};


/**
 * 设置 file 缓存
 * @param file {String} 待判断文件路径
 * @param options {Object} 配置
 * @param options.srcDirname {String} 原始目录
 */
exports.set = function (file, options) {
    var cachePath = path.join(options.srcDirname, '7niu.cache.log');
    var data = getData(cachePath);
    var relative = path.relative(options.srcDirname, file);
    var version = encryption.etag(file);
    var matched = matches(relative, version, data);

    if (matched) {
        return true;
    }

    var appendData = relative + '\t' + version + '\n';

    try {
        fse.appendFileSync(cachePath, appendData, 'utf8');
    } catch (err) {
        // ignore
    }

    return true;
};

