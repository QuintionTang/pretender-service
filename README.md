# pretender-service

一个简单的后台 MOCK 服务，基于 RESTFul 标准设计

### 开始

1. 安装依赖

```
npm install
```

2. 运行

```
node app.js
```

默认服务地址：`http://127.0.0.1:4288`

可以修改默认的端口，更改文件：`config/index.js`

```
module.exports = {
    express: {
        origin: "127.0.0.1:3080",
    },
    port: 4288,  // 运行端口
};
```
