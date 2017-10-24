// 关闭广告
window.onload = check;
// 广告条
var ad = document.getElementById("ad"),
    close = document.getElementById("close");
close.onclick = closeAd;
// 关注按钮
var star = document.getElementById("star"),
    stared = document.getElementById("stared"),
    login = document.getElementById("login");

//取消关注按钮
var cancel = document.getElementById("cancel");
cancel.onclick = unstar;
// 登录表单
var submit = document.getElementById("submit"),
    input1 = document.getElementById("username"),
    input2 = document.getElementById("password"),
    closelogin = document.getElementById("closelogin");
closelogin.onclick = closeLogin;

//默认的广告是不显示的，当默认为显示时，页面加载完成进行判断之后才会决定广告是否显示，如果判断为不显示，广告会从有到没，会闪一下，用户体验不好
function check() {
    if (cookie.getCookie("ad") == 1) {
        ad.style.display = "none";
    } else {
        ad.style.display = "block";
    }

    if (cookie.getCookie("login")) {
        if (cookie.getCookie("stared")) {
            star.style.display = "none";
            stared.style.display = "inline-block";
        } else {
            star.onclick = onlystar;
        }
    } else {
        star.onclick = openLogin;
        submit.onclick = checkAction;
    }
}
// 关闭广告条
function closeAd() {
    ad.style.display = "none";
    cookie.setCookie("ad", "1", 1);
}
// 打开登录弹窗
function openLogin() {
    login.style.display = "block";
}
//关闭弹窗登录
function closeLogin() {
    login.style.display = "none";
}


//登陆框并关注
function checkAction() {
    var username = input1.value,
        password = input2.value;
    //发送验证请求
    var obj = {
        // dataType:'json
        method: 'get',
        url: '/get',
        data: { username: username, password: password },
        success: reactAction,
        async: true
    };
    ajax(obj);
}

function reactAction(x) {
    if (x == 1) {
        star.onclick = onlystar;
        login.style.display = "none";
        cookie.setCookie("login", username, 1);
        toStar(username);

    } else {
        input1.value = "";
        input2.value = "";
    }

}

function toStar(username) {
    var obj = {
        method: "get",
        url: "/star",
        data: { username: username },
        success: staredAction,
        async: true
    }
    ajax(obj);
    cookie.setCookie("stared", "ture", 1);
}

function unstar() {
    var obj = {
        method: "get",
        url: "/unstar",
        data: { username: cookie.getCookie("login") },
        success: unstarAction,
        async: true
    }
    ajax(obj);
    cookie.deleteCookie("stared");
}

// 在已登录情况下发送关注请求
function onlystar() {
    var obj = {
        method: "get",
        url: "/star",
        data: { username: cookie.getCookie("login") },
        success: staredAction,
        async: true
    }
    ajax(obj);
}

function unstarAction(x) {
    if (x == 1) {
        star.style.display = "inline-block";
        stared.style.display = "none";
        cookie.deleteCookie("stared");
    }
}

function staredAction(x) {
    if (x == 1) {
        star.style.display = "none";
        stared.style.display = "inline-block";
        cookie.setCookie("stared", "true", 1);
    }
}

// 轮播图
var banner = document.getElementById("banner"),
    bimg = document.getElementById("b-img"),
    bnav = document.getElementById("b-nav"),
    blink = bimg.getElementsByTagName("a"),
    navspan = bnav.getElementsByTagName("span"),
    index = 0,
    timer1 = null,
    timer2 = null,
    alpha = 50;

for (var i = 0; i < blink.length; i++) {
    navspan[i].id = i;
    navspan[i].onmouseover = function() {
        clearInterval(timer1);
        setBanner(this.id);
    }
    navspan[i].onmouseout = function() {
        index = this.id;
        timer1 = setInterval(function() {
            index++;
            if (index >= 3) {
                index = 0;
            }
            setBanner(index);
        }, 5000)
    }
}

timer1 = setInterval(function() {
    setBanner(index);
    index++;
    if (index >= 3) {
        index = 0;
    }
}, 5000)

function setBanner(index) {
    for (var j = 0; j < blink.length; j++) {
        blink[j].style.display = "none";
        navspan[j].style.backgroundColor = "white";
    }
    blink[index].style.display = "block";
    navspan[index].style.backgroundColor = "#333";
    fadeIn(blink[index], 100);
}

function fadeIn(element, target) {
    clearInterval(timer2);
    timer2 = setInterval(function() {
        var speed = 0; //定义运动的速度
        if (alpha < target) {
            speed = 5;
        } else {
            speed = -5;
        }
        if (alpha == target) //若传入的的透明度等于本来的透明度就清除定时器
        {  
            element.style.filter = "alpha(opacity:" + alpha + ")";
            element.style.opacity = alpha / 100;
            clearInterval(timer2);
            alpha = 50;
        } else {
            alpha = alpha + speed;
            element.style.filter = "alpha(opacity:" + alpha + ")";
            element.style.opacity = alpha / 100;
        }
    }, 50)
}

//tab选项卡
var design = document.getElementById("design"),
    code = document.getElementById("code"),
    designpart = document.getElementById("designpart"),
    codepart = document.getElementById("codepart");

design.onmouseover = function() {
    this.className = "current";
    code.className = "";
    codepart.style.display = "none";
    designpart.style.display = "block";
}
code.onmouseover = function() {
    this.className = "current";
    design.className = "";
    designpart.style.display = "none";
    codepart.style.display = "block";
}