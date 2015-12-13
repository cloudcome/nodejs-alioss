/**
 * upload a file
 * @author ydr.me
 * @create 2015-03-11 18:15
 */

'use strict';

var fs = require('fs');
var xml2js = require('xml2js');

var request = require('ydr-utils').request;
var path = require('ydr-utils').path;
var aliOSS = require('ydr-utils').aliOSS;
var typeis = require('ydr-utils').typeis;

var uploadURL = 'http://up.qiniu.com';
var REG_START_END = /^\/|\/$/;


/**
 * upload a file
 * @param file {String} 待上传文件的绝对路径
 * @param options {Object} 配置
 * @param options.srcDirname {String} 起始目录
 * @param options.destDirname {String} 目标目录
 * @param options.bucket {String} 七牛仓库
 * @param options.accessKey {String} ak
 * @param options.secretKey {String} sk
 * @param callback {Function} 上传回调
 * @returns {string}
 */
module.exports = function (file, options, callback) {
    callback = typeis.function(callback) ? callback : function () {
        // ignore
    };

    var relativePath = path.relative(options.srcDirname, file);
    var sign = aliOSS.signature('put', relativePath);

    request.put({
        url: sign.requestURL,
        headers: sign.headers,
        body: fs.createReadStream(file),
        timeout: -1
    }, function (err, body, res) {
        if (err) {
            err.file = file;
            return callback(err, body);
        }

        if(res.statusCode === 200){
            return callback();
        }

        xml2js.parseString(body, function (err, json) {
            if (err) {
                err.file = file;
                return callback(err, body);
            }

            err = new Error(json.Error.Message || 'unknow error');
            err.file = file;
            callback(err);
        });
    });
};
