/*!
 * 文件描述
 * @author ydr.me
 * @create 2015-03-11 18:14
 */

'use strict';

var fs = require('fs');
var typeis = require('ydr-util').typeis;

/**
 * 遍历目录
 * @param dir {String} 绝对目录
 * @returns {Array}
 */
module.exports = function traverse(dir) {
    var files = [];

    function recursion(dir) {
        fs.readdirSync(dir).forEach(function (f) {
            f = path.join(dir, f);

            if (typeis.file(f)) {
                files.push(f);
            } else {
                recursion(f);
            }
        });
    }

    recursion(dir);

    return files;
};
