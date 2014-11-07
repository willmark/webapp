
define([], function () {
    /**
     * Generic AJAX invoke with callback
     */
    function ajax(url, cb, params) {
        var xmlhttp;
        if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else { // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        var rsc = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                cb(xmlhttp.responseText);
            }
        };
        xmlhttp.onreadystatechange = rsc;
        //xmlhttp.open("GET", url, true);
        //xmlhttp.send();
        xmlhttp.open("POST", url, true);
        xmlhttp.send(params);
    }
    return ajax;
});
