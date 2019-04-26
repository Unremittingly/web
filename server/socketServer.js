let server = require('ws').Server;
let ws = new server({
    port: 8003
},function (e) {
    if(!e){
        console.log('ws服务器开启，监听8003端口');
    }else{
        console.log('开启失败',e);
    }

});
var connNum = [];
//函数参数，连接的对象
ws.on("connection", function (socket,req) {
    console.log('socket',req.connection);
    connNum.push(socket);
    console.log("连接了" + connNum.length);
    //收到消息发送给每一个人
    socket.on("message", function (msg) {
        console.log('msg',msg);
        //广播给所有人
        for (var i = 0; i < connNum.length; i++) {
            connNum[i].send(msg);
        }
    });
    socket.send("发送的消息");
    //断开连接
    socket.on("close", function () {
        connNum.splice(connNum.indexOf(this), 1);
    })
});







