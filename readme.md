# alioss
上传操作会在当前工作目录查找`alioss.json`文件作为配置

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

    // 上传的文件列表
    "upload": [
        "./**/*.*"
    ],

    // 源目录
    "src": "./",

    // 上传的目录
    "dest": "/test/",

    // 并行上传数量，默认10
    "parallel": 10
}
```