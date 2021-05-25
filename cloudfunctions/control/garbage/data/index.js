const cloud = require('wx-server-sdk')
const request = require('request');
const rp = require('request-promise');
const log = cloud.logger()

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
  })
const db = cloud.database({
    throwOnNotFound: false
})
const _ = db.command;
const globalConfig = require('../../config/index')
const $ = db.command.aggregate
// import moment from '../../utils/moment.min';

module.exports =async (event,context,root)=>{
    const {
        OPENID,UNIONID
    } = cloud.getWXContext();
    let parame = event.data||{};
    let result = await apiRequest()
    var res = {
        errcode:200,
        msg: "操作成功!",
        result:result||{},
        success:true,
        timestamp:new Date().getTime()
    }
    return res;
}
function apiRequest(){
    return new Promise((resolve,reject)=>{
        request.get("https://api.tianapi.com/txapi/lajifenlei/index?key=2c52cf2cd023ccef3c6d44439a7e2cd8&word=眼镜",function(err,response,body){
            console.log(body)
            log.info({ name: '_查询_log',body: body||{},err:err||{},response:response||{} });
            resolve(body)
        })
    })
}