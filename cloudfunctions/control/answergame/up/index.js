const cloud = require('wx-server-sdk')
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
  })
const db = cloud.database({
    throwOnNotFound: false
})
const _ = db.command;
const $ = db.command.aggregate
const globalConfig = require('../../config/index')

module.exports =async (event,context,root)=>{
    const {
        OPENID
    } = cloud.getWXContext();
    // 验证该接口是否需要验证注册
    let parame = event.data;
    try {
        var data_info = {};
        data_info.openId = OPENID;
        data_info.create_time = db.serverDate();
        data_info.updata_time = db.serverDate();
        
        await db.collection('questionnaire_list').add({
            data: Object.assign(parame,data_info)
        })
        
         var res = {
             errcode:200,
             msg: "操作成功",
             result:{},
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