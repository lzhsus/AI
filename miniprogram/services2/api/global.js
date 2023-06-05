import request from "./request";
import appConfig from '../../common/app_config';
let globalApi = {}

globalApi.login = function(data){
    let header = {
        'appid2': appConfig.appid2,
    }
    return request(appConfig[appConfig.envVersion].serverPath+'weixinopen/api/miniapp/login?appid2='+appConfig.appid2, data, 'POST', header)
} 

export { globalApi }