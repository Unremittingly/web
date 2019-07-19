
const path= require('path');
const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname)));
console.log('11',path.join(__dirname));
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "userInfo/json;charset=utf-8");
    next();
});

app.listen('9998',function () {
    console.log('start server:端口号 9998');
});
