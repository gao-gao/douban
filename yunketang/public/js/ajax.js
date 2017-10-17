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