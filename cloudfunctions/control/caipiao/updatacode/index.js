const cloud = require('wx-server-sdk')  
const request = require('request')
var rp = require('request-promise');

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
  })
const db = cloud.database({
    throwOnNotFound: false
})
const _ = db.command;
const globalConfig = require('../../config/index')
const $ = db.command.aggregate

module.exports =async (event,context,root)=>{
    const {
        OPENID,UNIONID
    } = cloud.getWXContext();
    let parame = event.data||{};
    try {
        var options = {
            uri: parame.url||'https://kaijiang.500.com/shtml/dlt/21087.shtml',
            method:"GET",
            qs: {},
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true 
        };
        let result = await rp(options)
        let index = result.indexOf('ball_box01')
        let q = result.indexOf('iSelectBox')

        var res = {
            errcode:200,
            msg: "操作成功!",
            result:{
                str:result,
                q:q,
                start:index+12,
                count:340,
            },
            success:true,
            timestamp:new Date().getTime()
        }
    } catch (error) {
        var error_type = globalConfig.common.error_type(error.errCode);
        var res = {
             errcode:404,
             msg: error_type.type,
             result:error,
             success:false,
             timestamp:new Date().getTime()
        }
    }
    return res;
}