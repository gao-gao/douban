在实现云课堂的功能需求中，我遇到了以下几个问题：
### 关闭顶部的广告通知条，刷新页面后不再出现此通知条
#### cookie简介：
记录用户的一些信息记录在客户端，这样当用户再次访问这个页面时可以通过保存在客户端的一些信息做一些判断和设置

- 主要内容：名字，值，过期时间，路径和域（都是以名值对的形式存储）

#### document.cookie
通过这个语句对cookie进行创建，读取或删除（其实就是将创建好的字符串赋给`document.cookie`），其返回格式类似于"cookie1=value; cookie2=value;"的字符串

#### 封装设置cookie值的函数
首先设置过期时间，然后将名和值和过期时间按照cookie要求的格式加起来赋给`document.cookie`
```
function setCookie(cname,cvalue,exdays){
    //获取过期时间日期,当前日期加上cookie可保存在客户端的时间
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expries = "expires="+d.toGMTString()+";"; 
    //以cookie=value;的格式将名值对赋给document.cookie
    document.cookie = cname+"="+cvalue+";"+expires;
}
```
代码解释：  
- setTime()方法：将毫秒数转化为CST时间格式，传入的参数为据 GMT 时间 1970 年 1 月 1 日午夜之间的毫秒数
- getTime()方法：将CST时间转化为距 1970 年 1 月 1 日之间的毫秒数，结合一个date对象使用
- toGMTString()方法：将date对象转换为字符串，现在一般用toUTCString()代替toGMTString()

#### 封装获取cookie值的函数
通过分析document.cookie的值（即遍历字符串中的名值对），将所要获取的值返回，例如获取cname
```
function getCookie(cname){
    var name = cname+"=";
    var data = document.cookie.split(";");
    for(var i = 0; i < data.length; i++){
        var c = data[i].trim();
        if(c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
    return ""
}
```
代码解释：
- split(): 把一个字符串分割成字符串数组,传入参数为分割点
- trim(): 移除字符串两侧的空白字符或其他预定义字符（使用上有浏览器限制，较低版本浏览器需要手动封装一个trim函数）
- indexOf(): 返回某个指定的字符串值在字符串中首次出现的位置，参数为需要查找的字符串，没找到则返回-1
- substring(): 返回从beginIndex开始取，到endIndex结束，从0开始数，其中不包括endIndex位置的字符

#### 封装检测cookie值的函数
例如云课堂中任务中，第一次访问网页时手动点击将顶部的广告条隐藏，再次刷新此页面的时候，要做到不再出现广告条，就需要在隐藏广告的点击操作中设置cookie，当网页再次刷新时，检查cookie是否存在，存在则隐藏广告条
```
function checkCookie(){
    var username = getCookie("gaogao");
    if(username){
        //设置广告条隐藏
    }
}
```


#### 完整实例
```
window.onload = checkCookie;
//获取广告条
var ad = document.getElementById("ad"),
    close = document.getElementById("close");

//给相应区域绑定点击关闭广告事件
close.onclick = closeAd;

function closeAd() {
    ad.style.display = "none";
    setCookie("ad", "1", 1);
}

//封装设置cookie函数
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

//封装获取cookie中指定名值的函数
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0)
            return c.substring(name.length, c.length);
    }
    return "";
}

//检查是否存在cookie中"ad=1"这个名值对是否存在
function checkCookie() {
    if (document.cookie) {
        var checkvalue = getCookie("ad");
        if (checkvalue == 1) {
            ad.style.display = "none";
        } else {
            ad.style.display = "block";
        }
    } else {
        ad.style.display = "block";
    }
}
```
在检查是否存在cookie时，由于一个页面中cookie名值对很多，所以要具体到其名和值是否存在且对应，所以要进行用下面的思路进行检测：
- document.cookie是否存在，不存在则结束检测，广告条display:block
- document.cookie存在，检测cookie中是否有关于关闭广告的名值对，并验证是是否正确，正确则默认广告条隐藏，不正确广告条还是display:block

#### 封装一个cookie
```
var cookie = {
    setCookie: function(cname, cvalue, exdays, path, domain) {
        var str = cname + "=" + encodeURI(cvalue) + "; "
        if (exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toGMTString() + ";";
            str += expires;
        }
        if (path) {
            var cpath = "path=" + path + ";";
            str += cpath;
        }
        if (domain) {
            var cdomain = "domain" + domain + ";";
            str += cdomain;
        }
        document.cookie = str;
    },
    getCookie: function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0)
                return decodeURI(c.substring(name.length, c.length));
        }
        return "";
    },
    deleteCookie: function(cname) {
        var cvalue = "";
        var d = new Date();
        d.setTime(d.getTime() - (2 * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toGMTString() + ";";
        var str = cname + "=" + cvalue + "; " + expires;
        document.cookie = str;
    }
}
```
通过cookie这个接口调用“设置，获取和删除”方法
```
//设置cookie
cookie.setCookie("cookie1","https://www.baidu.com/s?ie=UTF-8&wd=哈哈",1,"/","localhost");

//获取cookie
cookie.getCookie("cookie1");

//删除cookie
cookie.deleteCookie("cookie1);
```
代码解释：
- encodeURI():对URL进行编码
- decodeURI():对编码过的URL进行解码
