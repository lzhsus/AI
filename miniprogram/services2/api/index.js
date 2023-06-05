import apiRequest from "./apiRequest";
import appConfig from '../../common/app_config';

let Api = Object.assign({},{});

// 用户列表
Api.userInfo = function(data, opt={}){
    return apiRequest(appConfig[appConfig.envVersion].serverPath+'user', data, { ...{method:'POST',isShowLoading:true, isShowError:true} ,...opt });
}
Api.decrypt = function(data, opt={}){
    return apiRequest(appConfig[appConfig.envVersion].serverPath+'decrypt', data, { ...{method:'POST',isShowLoading:true, isShowError:true} ,...opt });
}

module.exports = Api;