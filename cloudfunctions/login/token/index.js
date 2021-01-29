// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require('request-promise');
module.exports ={
    token
}
async function token(event, context){
    const page = event.page
    const scene = event.scene
    //appid和秘钥
    const appid = "wxe7bd80f710c7cb35";
        secret = "8d10bef07cba6ee22e90984987f241a9";
    const AccessToken_options = {
        method: 'GET',
        url: 'https://api.weixin.qq.com/cgi-bin/token',
        qs: {
            appid,
            secret,
            grant_type: 'client_credential'
        },
        json: true
    };
    //获取AccessToken
    const resultValue = await rp(AccessToken_options);
    const token = resultValue.access_token;
    return token;
}