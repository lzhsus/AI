const cloud = require('wx-server-sdk')
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
    try {
        let { stepInfoList } = event['weRunData'].data;
        let todayItem = stepInfoList[stepInfoList.length-1];
        // 检查当天的数据是否有变化
        let resultToday = await db.collection('wx_run').aggregate().match({
            openId:OPENID,
            timestamp:todayItem.timestamp,
            step:todayItem.step
        }).end();

        // 检查是否存在数据 当天的数据预警存在 并且没有更新
        let isPresence = resultToday&&resultToday.length>=1;
        if(isPresence){
            var res = {
                errcode:200,
                msg: "操作成功!",
                result:todayItem,
                success:true,
                timestamp:new Date().getTime()
            }
        }else{
            var data_info = {};
            data_info.openId = OPENID;
            data_info.create_time = db.serverDate();
            data_info.updata_time = db.serverDate();
            let result = await db.collection('wx_run').where({
                openId:OPENID
            }).count();
            // 检查是否存在数据
            isPresence = result&&result.total&&result.total>0;
            if(isPresence){
                let resultDay = await db.collection('wx_run').where({
                    timestamp:todayItem.timestamp
                }).count()
                // 检查当天是否存在
                isPresence = resultDay&&resultDay.total&&resultDay.total>0;
                if(isPresence){
                    await db.collection('wx_run').where({
                        timestamp:todayItem.timestamp
                    }).update({
                        data:{
                            step:todayItem.step,
                            updata_time:db.serverDate()
                        }
                    })
                }else{
                    await db.collection('wx_run').add({
                        data:Object.assign(data_info,todayItem)
                    })
                }
            }else{
                for(let i=0;i<stepInfoList.length;i++){
                    await db.collection('wx_run').add({
                        data:Object.assign(data_info,stepInfoList[i])
                    })
                }
            }
        }
        var res = {
            errcode:200,
            msg: "操作成功!",
            result:todayItem,
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