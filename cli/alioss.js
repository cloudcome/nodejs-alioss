#!/usr/bin/env node

var log = require('../libs/log.js');

var CWD = process.cwd();
var cmdArgs = process.argv.slice(2);
var cmdArg0 = cmdArgs[0];
var cmdArg1 = cmdArgs[1];
var buildPath = cmdArg1 ? path.join(CWD, cmdArg1) : CWD;


switch ((cmdArg0 || "").toLowerCase()) {
    case 'upload':

        break;

    case 'json':
        require('../libs/json.js')(buildPath);
        break;

    default :
        log(true, 'alioss help', '输出帮助信息', 'success');
        log(true, 'alioss json [dir]', '在指定目录生成 `alioss.json` 文件', 'success');
        log(true, 'alioss upload [dir]', '上传指定目录到阿里云 OSS', 'success');
}