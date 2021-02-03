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

module.exports =async (event,context,root)=>{
    const {
        OPENID,UNIONID
    } = cloud.getWXContext();
    let parame = event.data||{};
    try {
        let star_time = new Date(new Date().toLocaleDateString());
        let end_time =  new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1);
        var result= await db.collection('user_info')
            .aggregate()
            .match({
                openId: _.eq(OPENID)
            })
            .lookup({
                from:"user_sign_log",
                let:{},
                pipeline: $.pipeline()
                    .match({
                        create_time:_.and(_.gt(star_time), _.lt(end_time)),
                        openId:_.eq(OPENID)
                    })
                    .count('count')
                    .done(),
                as:'is_sign'
            })
            .lookup({
                from:"invoke_boast_msg",
                let:{},
                pipeline: $.pipeline()
                    .match({
                        openId:_.eq(OPENID)
                    })
                    .count('count')
                    .done(),
                as:'boast_msg'
            })
            .lookup({
                from:"invoke_emotional_msg",
                let:{},
                pipeline: $.pipeline()
                    .match({
                        openId:_.eq(OPENID)
                    })
                    .count('count')
                    .done(),
                as:'emotional_msg'
            })
            .lookup({
                from:"invoke_jokebot_msg1",
                let:{},
                pipeline: $.pipeline()
                    .match({
                        openId:_.eq(OPENID)
                    })
                    .count('count')
                    .done(),
                as:'jokebot_msg1'
            })
            .lookup({
                from:"invoke_jokebot_msg2",
                let:{},
                pipeline: $.pipeline()
                    .match({
                        openId:_.eq(OPENID)
                    })
                    .count('count')
                    .done(),
                as:'jokebot_msg2'
            })
            .lookup({
                from:"invoke_jokebot_msg3",
                let:{},
                pipeline: $.pipeline()
                    .match({
                        openId:_.eq(OPENID)
                    })
                    .count('count')
                    .done(),
                as:'jokebot_msg3'
            })
            .lookup({
                from:"invoke_jokebot_msg4",
                let:{},
                pipeline: $.pipeline()
                    .match({
                        openId:_.eq(OPENID)
                    })
                    .count('count')
                    .done(),
                as:'jokebot_msg4'
            })
            .lookup({
                from:"invoke_jokebot_msg5",
                let:{},
                pipeline: $.pipeline()
                    .match({
                        openId:_.eq(OPENID)
                    })
                    .count('count')
                    .done(),
                as:'jokebot_msg5'
            })
            .project({
                is_sign:true,//当天签到
                emotional_msg:$.arrayElemAt(['$emotional_msg', 0]),//情感分析
                boast_msg:$.arrayElemAt(['$boast_msg', 0]),         //夸夸话术
                jokebot_msg1: $.arrayElemAt(['$jokebot_msg1', 0]),//笑话
                jokebot_msg2: $.arrayElemAt(['$jokebot_msg2', 0]),
                jokebot_msg3: $.arrayElemAt(['$jokebot_msg3', 0]),
                jokebot_msg4: $.arrayElemAt(['$jokebot_msg4', 0]),
                jokebot_msg5: $.arrayElemAt(['$jokebot_msg5', 0]),
                create_time: true,
                openId:true,
                token:true,
                token_time:true,
                unionId:true,
                updata_time:true,
                _id:true,
                restrict_count:true,
                avatarUrl:true,
                nickName:true,
                gender:true
            })
            .end()
        result = result.list.map(res=>{
                if(!res.jokebot_msg1) res.jokebot_msg1 ={count:0};
                if(!res.jokebot_msg2) res.jokebot_msg2 ={count:0};
                if(!res.jokebot_msg3) res.jokebot_msg3 ={count:0};
                if(!res.jokebot_msg4) res.jokebot_msg4 ={count:0};
                if(!res.jokebot_msg5) res.jokebot_msg5 ={count:0};
                if(!res.boast_msg) res.boast_msg = {count:0};
                if(!res.emotional_msg) res.emotional_msg = {count:0};
                
            res.jokebot_msg = {
                count:res.jokebot_msg1['count']+res.jokebot_msg3['count']+res.jokebot_msg3['count']+res.jokebot_msg4['count']+res.jokebot_msg5['count']
            }
            res.is_sign = res.is_sign&&res.is_sign.length?1:0
            return res;
        })

        var res = {
            errcode:200,
            msg: "操作成功!",
            result:result[0],
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