/*!
 * 文件描述
 * @author ydr.me
 * @create 2015-03-11 18:15
 */

'use strict';

var mime = require('ydr-util').mime;
var request = require('ydr-util').request;
var sign = require('./sign.js');


/**
 * 上传文件
 * @param file {String} 待上传文件的绝对路径
 */
module.exports = function upload(options, file, callback) {
    var extname = path.extname(file);
    var headers = {
        'content-type': mime.get(extname)
    };
    var object = '/test/' + path.relative(__dirname, file);
    var remote = 'http://' + options.bucket + '.' + options.host + (object ? object : '');

    request.put({
        url: remote,
        headers: sign('PUT', object, headers),
        file: file
    }, callback);
};

