/*!
 * 文件描述
 * @author ydr.me
 * @create 2015-03-11 18:29
 */

'use strict';


var fs = require('fs');
var path = require('path');
var log = require('./log.js');


module.exports = function (dir) {
    var f = path.join(dir, './alioss.json');

    try {
        var data = fs.readFileSync(f, 'utf8');
        var config = {};

        try {
            config = JSON.parse(data);
        } catch (err) {
            log('parse file', f, 'error');
            log('parse json', err.message, 'error');
            return process.exit();
        }

        return config;
    } catch (err) {
        log('read file', f, 'error');
        log('read file', err.message, 'error');
        return process.exit();
    }
};
