var cookie = {
    setCookie: function(cname, cvalue, exdays, path, domain) {
        var value =  encodeURI(cvalue)
        var str = cname + "=" + value + "; "
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