var fetch = require("node-fetch");
var fs = require("fs");

function download(u, p) {
    return fetch(u, {
        method: 'GET',
        headers: { 'Content-Type': 'application/octet-stream' },
    }).then(res => res.buffer()).then(_ => {
        fs.writeFile(p, _, "binary", function (err) {
            console.log(err || p);
        });
    });
}
////////======= 
var url = 'http://dl.stream.qqmusic.qq.com/M800002TUBbZ4dYMyq.mp3?guid=BZQLL&vkey=10EFF942A042E4193426990A7E41A5A87CE8A810547FE8FACFC3C2676F5C24D5C040361CF23B344BDE97D8747A83BEFF9C01DDF837F9A3FF&uin=0&fromtag=143'; //设置下载文件的url地址

download(url, url.split("/").reverse()[0]);