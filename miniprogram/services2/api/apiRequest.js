import appConfig from '../../common/app_config';
import request from "./request";
import { globalApi } from "./global";
import * as common from '../../common/common';

var loginPromis;
export default async function apiRequest(url, params={}, opt={}){
    // 显示Loading
    if( opt.isShowLoading ) {
        wx.showLoading({
            title: '加载中',
            mask: true,
        });
    } 

    let res;
    let loginInfo = wx.getStorageSync(appConfig.envVersion+'LoginInfo');

    // 微信登录
    if( !loginInfo ){
        if( !loginPromis ){
            loginPromis = login();
        }
        loginInfo = await loginPromis;
    }

    // 请求API添加头部信息
    let header={
        authorization: 'Bearer '+(loginInfo&&loginInfo.token),
        appid: appConfig.appid,
    }
    
    loginPromis = null;

    // 请求接口
    res = await request(url, params, opt.method, header);
    if( [9001, 41002, 41001, 41008].indexOf(Number(res.errcode))!=-1 ){
        wx.removeStorageSync(appConfig.envVersion+'LoginInfo');
        res = await apiRequest(url, params, opt);
    }
    // 隐藏Loading
    if( opt.isShowLoading ){
        wx.hideLoading();
    }
    appConfig.loginInfo = loginInfo;
    return new Promise(function(resolve, reject) {
        if( res.errcode==-1&&opt.isShowError ){
            // 接口请求失败
            wx.showModal({
                content: res.msg,
                showCancel: false,
            });
            reject();
        }else if( !appConfig.openlogin&&(res.errcode==41100||res.errcode==41009) ){
            // 尚未登录 ( appConfig.openlogin定义，用于多个API同时请求，只执行一次登录 )
            appConfig.openlogin = true;
            wx.removeStorageSync(AppConfig.envVersion+'UserInfo');
            wx.switchTab({
                url: '/pages/index',
            });
            reject();
        }else{
            // 正常结果返回
            resolve(res);
        }        
    });
}

// 登录
export async function login(){
    let res = await wxLogin();
    res = await globalApi.login(res);
    try {
        wx.setStorageSync(appConfig.envVersion+'LoginInfo', res.result);
    }catch(e) { }
    return res.result;
}

// 微信登录
export async function wxLogin(){
    return new Promise(function(resolve, reject) {
        wx.login({
            success: function (data) {
                let res = {
                    code: data['code'],
                };
                resolve(res);
            }
        });
    });
}

// 检查 session
export async function checkSession(){
    return new Promise(function(resolve, reject) {
        wx.checkSession({
            success: ()=>{
                resolve(1)
            },
            fail: ()=>{
                login().then(()=>{
                    resolve(1);
                });
            }
        });
    });
}