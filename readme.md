# alioss
阿里云 OSS 命令行。
[![Build Status][travis-img]][travis-url] 


## install
```
npm install -g alioss
```


## api
```
╔══════════════════════════════════════════════════════╗
║   alioss@2.0.0                                       ║
║   Ali cloud OSS command line                         ║
╚══════════════════════════════════════════════════════╝

1. Command
   upload                 >> upload files to qiniu
   init                   >> initial `alioss.json`
   clear                  >> clear upload cache
   version                >> show version information
   help                   >> show help information

2. Options
   -d --dirname           >> specified a directory
```


## alioss.json
```
{
    "accessKeyId": "your_accessKeyId",
    "accessKeySecret": "your_accessKeySecret",

    // 仓库
    "bucket": "your_bucket",

    // OSS 所在的域
    "host": "oss-cn-hangzhou.aliyuncs.com",

    // 缓存时间，默认 1 年
    "cacheControl": "max-age=315360000",

    // 待上传资源的源目录，相当于`alioss.json`所在的目录
    "src": "./",

    // 上传的文件列表，支持通配符，相对于 src
    "upload": [
        "./**/*"
    ],

    // 上传的 CDN 目录
    "dest": "/test/",

    // 并行上传数量，默认10
    "parallel": 10,
    
    // 缓存控制
    "cacheControl": "public",
    
    // 缓存有效期
    "expires": 31536000,
    
    // 默认文件类型
    "contentType": "application/octect-stream",
    
    // 是否 https 访问
    "https": true
}
```

## example
假设当前的资源目录是这样的：
```
- static
|-- js
|   `-- app
|       |-- abc.js
|       `-- def.js
|-- css
`-- alioss.json
```
要上传的资源为`./static/js/app/*`，线上的 CDN URL 为`/example.com/abc.js`。
```
{
    ...
    upload: [
        './**/*'
    ],
    src: './static/js/app/',
    dest: '/example.com/'
}
```


[travis-img]: https://travis-ci.org/cloudcome/nodejs-alioss.svg?branch=master
[travis-url]: https://travis-ci.org/cloudcome/nodejs-alioss
