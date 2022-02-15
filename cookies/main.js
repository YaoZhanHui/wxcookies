var cookiesbox = '<div id="cookiesBox" class="cookiesBoxcolor"><div class="title">社科文献媒体稿件库<p class="Symbol">·</p>虚拟授权</div><p class="SymbolIcon"></p></div>';
$("body").append(cookiesbox);
var box = '<div id="box"><div class="content">'+
	'<p class="tit">媒体稿件库当前此公众号授权状态为</p>' +
	'<div id="btn"></div>' +
	'<div id="btnmin"><span>授权cookie及token到媒体稿件库</span></div>' +
	'</div></div>'
$("#cookiesBox").append(box);

$("#cookiesBox").hover(function(){
    $("#box").css({"display":"block"})
},function(){
	$("#box").css({"display":"none"})
});

$("#btnmin").click(function(){
	var laserExtensionId = 2
	var token = getQueryVariable(document.URL, "token")
	var cook = document.cookie
	chrome.runtime.sendMessage({token,cook,laserExtensionId}, function(data){
		if ($.parseJSON(data).code == 1) {
			$("#cookiesBox").addClass("cookiesBoxcolor2")
			var testdiv = document.getElementById("btn");
			testdiv.innerHTML="<span>授权成功</span>";
		} else {
			var testdiv = document.getElementById("btn");
			testdiv.innerHTML="<span>授权未成功</span>";
		}
	});
})

function showResult() {
	var laserExtensionId = 1
	var token = getQueryVariable(document.URL, "token")
	chrome.runtime.sendMessage({token,laserExtensionId}, function(data){
		if ($.parseJSON(data).code == 1) {
			$("#cookiesBox").addClass("cookiesBoxcolor2")
			var testdiv = document.getElementById("btn");
			testdiv.innerHTML="<span>授权成功</span>";
		} else {
			var testdiv = document.getElementById("btn");
			testdiv.innerHTML="<span>未授权</span>";
		}
	});
}

window.addEventListener("load", showResult, false);

// 获取网页地址参数
function getQueryVariable(url, variable)
{
	var query = url.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
			var pair = vars[i].split("=");
			if(pair[0] == variable){return pair[1];}
	}
	return(false);
}

// cookies
function getCookie(name) {
    var prefix = name + "="
    var start = document.cookie.indexOf(prefix)
    if (start == -1) {
        return null;
    }
    var end = document.cookie.indexOf(";", start + prefix.length)
    if (end == -1) {
        end = document.cookie.length;
    }
    var value = document.cookie.substring(start + prefix.length, end)
    return value
}



