import request from "./request";

let api = Object.assign({},{});

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



module.exports = api;