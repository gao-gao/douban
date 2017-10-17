---
layout:     post
title:      "ajax发送请求&服务器处理请求"
date:       2017-10-16
categories: "nodejs"
author:     "gaogao"
tags:
 - nodejs   
description: "结合实例分析服务器的搭建，接受请求和响应；ajax发送请求并对响应结果进行处理"
---
### 紧接着上面一篇文章讲述我遇到的问题
有一个需求是这样的，点击关注，弹出登录框出现弹框登录，填写账户名密码提交，发送请求到服务器，服务器接收请求并进行验证，服务器发回响应，浏览器根据响应做出相应反应。  
依据这个需求需要做两件事：  
- 封装一个ajax请求发送请求 
- 创建一个服务器接收请求并响应

#### 分析请求
客户端向服务器发送的请求就是发送一个URL，根据URL中的一些信息定位资源在服务器上的位置以及向服务器传递一些参数
##### url格式
`protocol://hostname[:port]/path/[;parameters][?query]#fragments`
- protocol:协议，常见的有http,https,file,ftp(与获取文档相关)
- hostname:主机名，即域名，访问一个域名时，会先去电脑本地的`/etc/hosts`文件中查找该域名对应的IP地址，如果找不到就进行DNS解析找到相应的IP地址
- port:监听端口，可以不设置，但是一旦设置就必须从这个端口进行访问才能在服务器上访问到相应的资源
- path:资源在服务器上的位置，即文件在服务器上的哪个文件夹下（绝对路径）
- parameters:于指定特殊参数的可选项
- ？query:查询字符串，可向服务器传递一些验证信息,多个参数用&隔开
- #fragments:用于指定网络资源中的片断
根据任务需求，要向浏览器发送用户名和密码并进行验证，所以其请求应该是这样：`http://127.0.0.1:8081/get/?username=gaogao&password=abc`

#### express搭建一个服务器
先搭建一个服务器并设置其监听窗口，然后设置静态资源,再获取请求处理请求
```
var express = require("express");
var yunpage = express();

var server = yunpage.listen(8081, function() {
    var host = server.address().host;
    var port = server.address().port;
    console.log("访问地址：http://%s:%s", "127.0 .0 .1", port)
})

yunpage.use(express.static("public"));

yunpage.get("/get",function(req,res){
    var username = req.query.username;
    var password = req.query.password;
    if(username=="gaogao"&&password=="abc"){
        res.send("1")
    }else{
        res.send("0")
    }
})
```
代码解释：
- require():引进express模块，nodejs中有很多很多的模块，由export输出，require引进
- listen():设置监听端口并传入回调函数
- express.static():设置静态文件
- req,res:前者用来获取request请求中的信息，后者用来设置对请求的响应

#### ajax请求
首先要创建一个ajax对象，然后发送请求等待服务器响应，最后根据服务器响应的结果进行相应的处理
```
var xhr;
if (window.XMLHttpRequest) {
    //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
    xhr = new XMLHttpRequest();
    } else {
    // IE6, IE5 浏览器执行代码
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
}
xhr.open("get", "/get?username=" + username + "&password=" + password, true);
xhr.send();
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        if (xhr.responseText == 1) {
            //对返回结果的响应
        } else {
           //对返回结果的响应
        }
    }
}
```
代码解释：
- 创建xhr对象：对于非IE和IE浏览器所使用的API不同，所以要进行兼容处理

- open(method,url,asnyc)：第一个参数为请求的类型post/get;第二个参数为文件在服务器的位置;第三个参数为是否异步

- get和post的使用：与post相比，get请求更加简单也更加快并且在大部分情况下都可以使用，除了一下情况：无法使用缓存文件；向服务器发送大量数据；包含未知字符的用户输入

- 同步和异步：如果asnyc值为true则为异步，在onreadystatechange事件触发之后对请求状态进行判断并对相应结果进行处理；不推荐值为false，因为javaScript 会等到服务器响应就绪才继续执行。如果服务器繁忙或缓慢，应用程序会挂起或停止。

- send(string)：将请求发送到服务器，当有参数时仅用于post请求

#### readyState状态值
- 0 未发送请求，send()方法没被调用
- 1 正在发送请求，send()方法正在被调用
- 2 载入完成，send()方法调用完成
- 3 交互，正在解析响应内容
- 4 相应内容解析完成，可以在客户端调用

#### status状态码
- 1**：请求收到，进行处理
- 2**：处理完成，成功返回响应
- 3**：完成此请求必须进一步处理
- 4**：请求包含一个错误语法或不能完成
- 5**：服务器执行一个完全有效请求失败
- 200：交易成功，客户端发送请求，服务端接收请求并处理响应，客户端接收响应都完成了
- 500：服务器产生内部错误
- 404：没有发现文件、查询或URl(服务器没有处理请求)
- 302：服务器进行了重定向，在其他地址访问到资源

#### 封装ajax请求
```
//创建一个xhr对象
function setXHR() {
    if (window.XMLHttpRequest) {
        return new window.XMLHttpRequest();
    } else if (ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    } else {
        throw new error("浏览器不支持xhr对象")
    }
}

// 封装一个ajax请求
function ajax(obj) {
    // 创建xhr对象
    var xhr = setXHR();
    // 将传入的data对象按照查询字符串的格式表示
    obj.data = params(obj.data);
    //为method和async设置默认参数（即传入值为空时设置为默认值）
    obj.method = obj.method || "post";
    obj.async = obj.async || "true";
    //在请求后面设置随机字符串解决IE浏览器第二次默认获取缓存的问题
    obj.url = obj.url + "?rand=" + Math.random() + "&";
    //对两种请求方式分别初始化请求并发送
    if (obj.method == "post") {
        // post请求中不将查询数据显示在URL中，而是作为send的参数发送给服务器
        xhr.open(obj.method, obj.url, obj.async);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(obj.data);
    } else {
        //get请求会将查询的内容显示在URL中，且send方法中无参数
        obj.url += obj.data;
        xhr.open(obj.method, obj.url, obj.async);
        xhr.send();
    }
    //判断是否异步，异步则用onreadystatechange事件监听当交易成功后调用回调函数，同步则等待交易成功后调用回调函数
    //判断客户端的状态
    if (obj.async) {
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                callback(xhr);
            }
        }
    } else {
        callback(xhr);
    }

    //回调函数通过判断服务器端的状态，并将响应作为参数传给success函数
    function callback(xhr) {
        //判断服务器状态为成功返回响应或者是客户端执行了请求但文件未变化
        if (xhr.status >= 200 && xhr.status < 300 || xhr == 304) {
            obj.success(xhr.responseText);
        } else {
            console.log("ERROR:" + xhr.status)
        }
    }
}

function params(data) {
    var arr = [];
    for (i in data) {
        arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
        // arr.push(i + "=" + data[i]);
    }
    return arr.join("&");
}
```
调用方式：
```
var obj = {
        // dataType:'json
        method: 'get',
        url: '/get',
        data: { username: username, password: password },
        success: reactAction1,
        async: true
    };

    ajax(obj);
```
