# pretender-service

一个 NODEJS + PostgreSQL 的后台服务，基于 RESTFul 标准设计

### 开始

1. 安装依赖

```
npm install
```

2. 安装 PostgreSQL

https://www.postgresql.org/download/

3. 初始化数据表

```
sequelize db:migrate
```

4. 初始化数据

```
sequelize db:seed:all
```

5. 运行

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
