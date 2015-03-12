# alioss
阿里云 OSS 命令行。


## install
```
npm install -g alioss
```


## api
- `alioss upload \[dir]` 上传指定目录到阿里云 OSS
- `alioss version` 输出版本信息
- `alioss json \[dir]` 在指定目录生成 `alioss.json` 模板文件
- `alioss help` 输出帮助信息



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
    "parallel": 10
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
