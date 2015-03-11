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

    fs.readFile(f, 'utf8', function (err, data) {
        if(err){
            log('read file', f, 'error');
            log('read file', err.message, 'error');
            return;
        }
    });
};
