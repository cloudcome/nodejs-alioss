/*!
 * 文件描述
 * @author ydr.me
 * @create 2015-03-11 21:14
 */

'use strict';

var pkg = require('../package.json');
var log = require('./log.js');
var request = require('ydr-util').request;
var url = 'http://registry.npmjs.com/alioss';

module.exports = function(){
    log('local version', pkg.version, 'success');
    log('check update', 'wait a moment...');

    request.get(url, function (err, data) {
        if(err){
            log('check update', 'connect npmjs.com error', 'error');
            process.exit();
        }

        var json = {};

        try{
            json = JSON.parse(data);
        }catch(err){
            log('check update', 'parse json string error', 'error');
            process.exit();
        }

        log('online version', json['dist-tags'].latest, 'success');
    });
};
