/*!
 * 文件描述
 * @author ydr.me
 * @create 2015-03-11 18:16
 */

'use strict';

var log = require('./log.js');
var path = require('path');
var fs = require('fs-extra');
var json = {
    accessKeyId: 'your_accessKeyId',
    accessKeySecret: 'your_accessKeySecret',
    bucket: 'your_bucket',
    host: 'oss-cn-hangzhou.aliyuncs.com',
    // headers
    headers: {
        'cache-control': 'max-age=315360000'
    },
    src: './',
    upload: ['./**/*.*'],
    dest: '/test/',
    // 并行数量
    parallel: 10
};

module.exports = function (dir) {
    var file = path.join(dir, './alioss.json');
    fs.writeFile(file, JSON.stringify(json, null, 2), function (err) {
        if(err){
            log('write file', file, 'error');
            log('write file', err.message, 'error');
            return process.exit();
        }

        log('write file', file, 'success');
    });
};



