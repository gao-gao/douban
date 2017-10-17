var express = require("express");
var app = express();
var user = ["gaogao"];
// 设置静态资源
app.use(express.static("public"));

//处理请求，前面一个参数是请求的路径，后面一个参数是请求的处理（为一个处理函数，中有两个参数req用于获取请求内容，res用于设置响应内容）

app.get("/get", function(req, res) {
    //req.query: 获取URL的查询参数串,将查询字符串解析为包含若干名值对的对象
    console.log(req.query.toString());
    var username = req.query.username;
    var password = req.query.password;
    if (username == "gaoting" && password == "abc") {
        res.send("1");
    } else {
        res.send("0");
    }
})

app.get("/star", function(req, res) {
    var username = req.query.username;
    user.push(username);
    res.send("1");
})

app.get("/unstar", function(req, res) {
    var username = req.query.username;
    user = removeByValue(user, username);
    res.send("1");
})


// 创建服务器
var server = app.listen(8081, function() {
    var host = server.address().host;
    var port = server.address().port;
    console.log("应用实例，访问地址为： http://%s:%s", "127.0.0.1", port)
})

function removeByValue(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            arr.splice(i, 1);
            break;
        }
    }
    return arr;
}