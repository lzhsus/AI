import request from "./request";
import requestHttp from "./requestHttp";
import cloud_index from "./cloud_index";

let api = Object.assign({},cloud_index);

api.invokeMsg = function(data, isShowLoading=true){
    return request('control','user/api/invoke/msg',data,isShowLoading);
}
api.invokeBoast = function(data, isShowLoading=true){
    return request('control','user/api/invoke/boast',data,isShowLoading);
}
api.invokeEmotional = function(data, isShowLoading=true){
    return request('control','user/api/invoke/emotional',data,isShowLoading);
}
api.userInfo = function(data, isShowLoading=true){
    return request('control','user/api/info',data,isShowLoading);
}
api.userSign = function(data, isShowLoading=true){
    return request('control','user/api/sign',data,isShowLoading);
}
api.userCreate = function(data, isShowLoading=true){
    return request('control','user/api/create',data,isShowLoading);
}
api.userRanking = function(data, isShowLoading=true){
    return request('control','user/api/ranking',data,isShowLoading);
}
api.userRankinglist = function(data, isShowLoading=true){
    return request('control','user/api/rankinglist',data,isShowLoading);
}
api.verseCreate = function(data, isShowLoading=false){
    return request('control','user/api/verse/create',data,isShowLoading);
}
api.chongwuupdata = function(data, isShowLoading=true){
    return request('control','user/api/chongwuupdata',data,isShowLoading);
}
api.apiSend = function(data, isShowLoading=false){
    return request('control','user/api/_send',data,isShowLoading);
}

// 音频使用记录
api.managerLog = function(data, isShowLoading=false){
    return request('control','user/api/manager_log',data,isShowLoading);
}
api.translateLog = function(data, isShowLoading=false){
    return request('control','user/api/translate_log',data,isShowLoading);
}
api.activeList = function(data, isShowLoading=false){
    return request('control','user/api/active',data,isShowLoading);
}
api.thirdpartyInfo = function(data, isShowLoading=false){
    return request('thirdparty','thirdparty/api/info',data,isShowLoading);
}
api.wx_serverApiOcr = function(data, isShowLoading=false){
    return request('control','wx_server/api/ocr',data,isShowLoading);
}
api.wxServerApiCreate = function(data, isShowLoading=false){
    return request('control','wx_server/api/create',data,isShowLoading);
}
api.wxServerApiUpdata = function(data, isShowLoading=false){
    return request('control','wx_server/api/updata',data,isShowLoading);
}
api.wxServerApiRun = function(data, isShowLoading=false){
    return request('control','wx_server/api/run',data,isShowLoading);
}
api.proPetList = function(data, isShowLoading=true){
    return request('control','user/api/pet/list',data,isShowLoading);
}
api.proPetDetail = function(data, isShowLoading=true){
    return request('control','user/api/pet/detail',data,isShowLoading);
}
api.tabList = function(data, isShowLoading=true){
    return requestHttp('https://6c7a-lzhsus-1g4h29bs69c66542-1301447037.tcb.qcloud.la/tablist.js?v=3333',data,isShowLoading);
}
api._sendData = function(data, isShowLoading=true){
    return requestHttp('https://6c7a-lzhsus-1g4h29bs69c66542-1301447037.tcb.qcloud.la/my_data/_send.js?v=3333',data,isShowLoading);
}

module.exports = api;