# alioss
上传操作会在当前工作目录查找`alioss.json`文件作为配置

## alioss.json
```
{
    "accessKeyId": "your_accessKeyId",
    "accessKeySecret": "your_accessKeySecret",
    "bucket": "your_bucket",
    "host": "oss-cn-hangzhou.aliyuncs.com",
    "cacheControl": "max-age=315360000",
    // 上传的文件
    "upload": [
        "./**/*.*"
    ],
    // 上传的目录
    "dirname": "/test/",
    // 并行上传数量
    "parallel": 5
}
```