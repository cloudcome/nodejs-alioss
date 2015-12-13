/**
 * upload a file
 * @author ydr.me
 * @create 2015-03-11 18:15
 */

'use strict';

var mime = require('ydr-utils').mime;
var request = require('ydr-utils').request;
var path = require('ydr-utils').path;
var qiniu = require('ydr-utils').qiniu;
var debug = require('ydr-utils').debug;
var typeis = require('ydr-utils').typeis;
var fs = require('fs');
var FormData = require('form-data');

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

    options.destDirname = path.toURI(options.destDirname);
    options.destDirname = options.destDirname.replace(REG_START_END, '');
    options.destDirname = '/' + options.destDirname + '/';

    var relativePath = path.relative(options.srcDirname, file);
    var destPath = path.join(options.destDirname, relativePath);
    var destDirname = path.dirname(destPath);
    var destBasename = path.basename(destPath);
    var destExtname = path.extname(destPath);
    var uploadKeyAndToken = qiniu.generateKeyAndToken({
        bucket: options.bucket,
        dirname: destDirname,
        filename: destBasename,
        accessKey: options.accessKey,
        secretKey: options.secretKey,
        mimeLimit: '*'
    });
    var fd = new FormData();

    fd.append('key', uploadKeyAndToken.key);
    fd.append('token', uploadKeyAndToken.token);
    fd.append('file', fs.createReadStream(file), {
        contentType: mime.get(destExtname)
    });

    request.post({
        url: uploadURL,
        form: fd,
        timeout: -1
    }, function (err, body, res) {
        if (err) {
            return callback(err, body);
        }

        if (res.statusCode === 200) {
            return callback(err, body);
        }

        var json;

        try {
            json = JSON.parse(body);
        } catch (err) {
            json = {
                error: 'parse upload response error'
            }
        }

        callback(new Error(json.error));
    });
};
