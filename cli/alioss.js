#!/usr/bin/env node

var log = require('../libs/log.js');
var traverse = require('../libs/traverse.js');
var parseConfig = require('../libs/parse-config.js');
var doUpload = require('../libs/upload.js');
var path = require('path');
var howdo = require('howdo');
var ProgressBar = require('progress');

var CWD = process.cwd();
var cmdArgs = process.argv.slice(2);
var cmdArg0 = cmdArgs[0];
var cmdArg1 = cmdArgs[1];
var CLIDIR = cmdArg1 ? path.join(CWD, cmdArg1) : CWD;

switch ((cmdArg0 || "").toLowerCase()) {
    case 'upload':
        upload();
        break;

    case 'version':
        require('../libs/check-version.js')();
        break;

    case 'json':
        require('../libs/build-json.js')(CLIDIR);
        break;

    default :
        log(true, 'alioss upload [dir]', '上传指定目录到阿里云 OSS', 'success');
        log(true, 'alioss version', '输出版本信息', 'success');
        log(true, 'alioss json [dir]', '在指定目录生成 `alioss.json` 文件', 'success');
        log(true, 'alioss help', '输出帮助信息', 'success');
}


function upload() {
    var options = parseConfig(CLIDIR);
    var bar;
    var time = Date.now();

    howdo
        // 1. 找到要进行上传的文件列表
        .task(function (next) {
            traverse(CLIDIR, options, next);
        })
        // 2. 上传操作
        .task(function (next, groups, len) {
            bar = new ProgressBar('[:bar]  :current/' + len + '  剩余：:etas', {
                complete: '=',
                incomplete: ' ',
                width: 100,
                total: len
            });
            log('upload', '将上传 ' + len + ' 个文件', 'warning');

            howdo.each(groups, function (i, group, next) {

                howdo.each(group, function (j, file, done) {
                    doUpload(CLIDIR, options, file, function () {
                        bar.tick(1);
                        done();
                    });
                }).together(next);

            }).follow(next);
        })
        .follow(function () {
            log('upload', 'upload all files', 'success');
            log('past', (Date.now() - time) + ' ms', 'success');
        });
}