/*!
 * 文件描述
 * @author ydr.me
 * @create 2015-03-11 18:11
 */

'use strict';

var dato = require('ydr-util').dato;
var crypto = require('crypto');



/**
 * 头信息签名
 * @param options {Object} 配置
 * @param method {String} 请求方法
 * @param object {String} 待上传的文件名
 * @param headers {Object} 头信息
 * @returns {Object}
 */
module.exports = function sign(options, method, object, headers) {
    var options = dato.extend({}, options, {
        method: method,
        object: object
    });
    var auth = 'OSS ' + options.accessKeyId + ':';
    var date = new Date().toUTCString();
    var params = [
        options.method.toUpperCase(),
        headers['content-md5'],
        headers['content-type'],
        date
    ];
    var resource = '/' + options.bucket + options.object;
    var ossHeaders = {};
    var signature;

    dato.each(headers, function (key, val) {
        var lkey = key.toLowerCase().trim();

        if (lkey.indexOf('x-oss-') === 0) {
            ossHeaders[lkey] = ossHeaders[lkey] || [];
            ossHeaders[lkey].push(val.trim());
        }
    });

    Object.keys(ossHeaders).sort().forEach(function (key) {
        params.push(key + ':' + ossHeaders[key].join(','));
    });

    params.push(resource);
    signature = crypto.createHmac('sha1', options.accessKeySecret);
    signature = signature.update(params.join('\n')).digest('base64');

    return dato.extend(headers, {
        Authorization: auth + signature,
        Date: date
    });
};
