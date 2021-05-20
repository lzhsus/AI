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
        let result = await db.collection('format_list')
        .aggregate()
        .limit(999)
        .lookup({
            from:"format_comment",
            let:{
                id:"$_id",
            },
            pipeline: $.pipeline()
                .match(_.expr($.and([
                    $.eq(['$pro_id', '$$id'])
                ])))
                .group({
                    _id: '$pro_id',
                    num: $.sum(1)
                })
                .done(),
            as:'counts'
        })
        .replaceRoot({
          newRoot: $.mergeObjects([ $.arrayElemAt(['$counts', 0]), '$$ROOT' ])
        })
        .project({
            counts: 0
        })
        .end();

        var res = {
            errcode:200,
            msg: "操作成功!",
            result:{
                list:result.list||[]
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