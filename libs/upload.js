/*!
 * 文件描述
 * @author ydr.me
 * @create 2015-03-11 18:15
 */

'use strict';

var mime = require('ydr-util').mime;
var request = require('ydr-util').request;
var typeis = require('ydr-util').typeis;
var sign = require('./sign.js');
var log = require('./log.js');
var path = require('path');
var xmlParse = require('xml2js').parseString;
var REG_TITLE = /<title>([\s\S]*?)<\/title>/;
var REG_SPLIT = /\/([^\/]*)/g;


/**
 * 上传文件
 * @param dir {String} 执行路径
 * @param options {Object} 配置
 * @param file {String} 待上传文件的绝对路径
 * @param callback {Function} 上传完毕回调
 */
module.exports = function upload(dir, options, file, callback) {
    dir = path.join(dir, options.src);

    var extname = path.extname(file);
    var headers = {
        'content-type': mime.get(extname)
    };
    var object = options.dest + path.relative(dir, file);
    var remote = 'http://' + options.bucket + '.' + options.host + (object ? object : '');

    request.put({
        url: remote,
        headers: sign(options, 'PUT', object, headers),
        file: file
    }, function (err, body, res) {
        if (err) {
            log('upload file', file, 'error');
            log('upload file', err.message, 'error');
            return process.exit();
        }

        if (res.statusCode === 200) {
            return callback();
        }

        xmlParse(body, function (err, ret) {
            var msg = '';

            if (err) {
                msg = (body.match(REG_TITLE) || ['', ''])[1];
                err = new Error(msg || 'parse upload result error');
            } else {
                msg = ret && ret.Error && ret.Error.Message;
                msg = typeis(msg) === 'array' ? msg[0] : msg;
                err = new Error(msg);
            }

            if (err) {
                log('upload file', file, 'error');
                log('upload response', err.message, 'error');
                return process.exit();
            }
        });
    });
};

