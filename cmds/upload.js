/**
 * upload cmd
 * @author ydr.me
 * @create 2015-12-14 00:05
 */


'use strict';


var dato = require('ydr-utils').dato;
var debug = require('ydr-utils').debug;
var aliOSS = require('ydr-utils').aliOSS;
var howdo = require('howdo');
var Progress = require('progress');

var parseConfig = require('../utils/parse-config.js');
var parseCache = require('../utils/parse-cache.js');
var upload = require('../utils/upload.js');
var banner = require('./banner.js');


module.exports = function (options) {
    banner();

    // 1. parse config
    var configs = parseConfig({
        srcDirname: options.srcDirname
    });
    aliOSS.config({
        accessKeyId: configs.accessKeyId,
        accessKeySecret: configs.accessKeySecret,
        bucket: configs.bucket,
        host: configs.host,
        cacheControl: configs.cacheControl,
        // 1年，单位 秒
        expires: configs.expires,
        domain: '',
        // 保存目录
        dirname: configs.destDirname,
        // 生成资源链接协议
        https: configs.https
    });

    // 2. parse cache
    var matchCache = parseCache.get(configs.uploadFiles, {
        srcDirname: options.srcDirname
    });
    var willUploadFiles = [];

    dato.each(configs.uploadFiles, function (index, file) {
        if (!matchCache[index]) {
            willUploadFiles.push(file);
        }
    });

    // 3. upload queue
    var willUploadLength = willUploadFiles.length;
    var willUploadGroup = [];
    while (willUploadFiles.length) {
        willUploadGroup.push(willUploadFiles.splice(0, configs.parallel));
    }
    var startTime = Date.now();
    var progress;

    howdo
        .each(willUploadGroup, function (i, group, next) {
            howdo
                .each(group, function (j, file, done) {
                    upload(file, {
                        srcDirname: configs.srcDirname,
                        destDirname: configs.destDirname
                    }, function (err) {
                        if (err) {
                            return done(err);
                        }

                        if(!progress){
                            progress = new Progress('[:bar]  :current/' + willUploadLength + '  剩余：:etas', {
                                complete: '=',
                                incomplete: ' ',
                                width: 70,
                                total: willUploadLength
                            });
                        }

                        parseCache.set(file, {
                            srcDirname: options.srcDirname
                        });
                        progress.tick(1);
                        done();
                    });
                })
                .together(next);
        })
        .follow()
        .try(function () {
            debug.success('upload files', willUploadLength);
            debug.success('upload success', 'past ' + (Date.now() - startTime) + 'ms');
        })
        .catch(function (err) {
            debug.error('upload error', err.message);
        });
};



