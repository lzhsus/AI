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
        // 创建第几期
        // period

        var options = {
            uri: parame.url||'https://kaijiang.500.com/dlt.shtml',
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
        let _res = {
            str:result,
            q:q,
            start:index+12,
            count:340,
        }
        let code = result.substr(index+12,340)
        let _q = result.substr(q+111,5)
        code = code.replace(/[^\d.]/g, "")
        let str = ''
        for(let i=0;i<7;i++){
            let _s = '-'
            if(i==6) _s = ''
            str+=code.slice(i*2,(i+1)*2)+_s
        }
        let isTrue = (_q+'').indexOf('21')!=-1;
        if(isTrue){
            await db.collection('caipiao_win').where({
                period:Number(_q)
            }).update({
                data:{
                    win_code:code
                }
            })
        }
        // console.log(_q,ul)
        var res = {
            errcode:200,
            msg: "操作成功!",
            result:{
                isTrue:isTrue||false,
                code:code,
                _q:_q,
                str:str
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