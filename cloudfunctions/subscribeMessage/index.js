// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database({
    throwOnNotFound: false
})
const _ = db.command;
const $ = _.aggregate
// 云函数入口函数
    const log = cloud.logger()
exports.main = async (event, context) => {
    const {
        OPENID
    } = cloud.getWXContext();
    let parsms = event.data;
    let sendData = {
        page: 'pages/my/my',
        data: {
            thing2: { //奖励
                value: "每日签到奖励次数~"
            },
            time3: { //签到时间
                value: dateFormat("YYYY-MM-DD", new Date())
            }
        }
    }
    var user = await db.collection('msg_send')
        .aggregate()
        .limit(9999)
        .end()
    let total = 0;
    let msgList = []
    try {
        let newArr = []; // 这个方法最简便
        for(let i=0;i<user.list.length;i++){
            let item = user.list[i];
            if(!newArr.some(res=>{return res.openId==item.openId})){
                newArr.push(item)
                break;
            }
        }

        for (let i = 0; i < newArr.length; i++) {
            msgList.push(subscribeMessage(sendData, newArr[i]))
        }
        let list = await Promise.all(msgList);
        for(let i=0;i<list.length;i++){
            if(list[i].code==0) break;
            db.collection('msg_send').where({
                _id: list[i].item._id
            }).remove()
        }
        var res = {
            errcode:200,
            msg: "操作成功!",
            result:{},
            newArr:list,
            success:true,
            timestamp:new Date().getTime()
        }
        
    }catch (error) {
        var res = {
             errcode:404,
             msg: "网络错误",
             result:{},
             user:user,
             success:false,
             timestamp:new Date().getTime()
        }
    }
    return res;
}

function subscribeMessage(sendData, item) {
    return new Promise(async (resolve, reject) => {
        try {
            let data = Object.assign(sendData, {
                touser: item.openId,
                templateId: "SaHm16y6Cjdod2w_EgbZhyhjUyKA4U72QRTUwjAJE30",
                lang: 'zh_CN',
            })
            await cloud.openapi.subscribeMessage.send(data)
            resolve({code:1,item})
        } catch (error) {
            resolve({code:0,item})
        }
    })
}
function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}