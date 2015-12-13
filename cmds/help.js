/**
 * show help info
 * @author ydr.me
 * @create 2015-12-14 00:04
 */


'use strict';


var debug = require('ydr-utils').debug;

var banner = require('./banner.js');

module.exports = function () {
    var options = {
        eventAlign: 'left',
        eventLength: 25
    };

    banner();
    console.log('1. Command');
    debug.success('   upload', 'upload files to qiniu', options);
    debug.success('   init', 'initial `alioss.json`', options);
    debug.success('   clear', 'clear upload cache', options);
    debug.success('   version', 'show version information', options);
    debug.success('   help', 'show help information', options);
    console.log();

    console.log('2. Options');
    debug.success('   -d --dirname', 'specified a directory', options);
    console.log();
};



