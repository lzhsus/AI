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
    try {
        let sendData = {
            page: 'pages/my/my',
            data: {
                thing2: { value: "每日签到奖励次数~" },
                time3: { value: dateFormat("YYYY-mm-dd", new Date()) }
            }
        }
        var _sendList = await db.collection('msg_send').aggregate().limit(9999).end();

        let msgList = [],newArr = []; 
        for(let i=0;i<_sendList.list.length;i++){
            if(!newArr.some(res=>{return res.openId==_sendList.list[i].openId})){
                newArr.push(_sendList.list[i]);
                break;
            }
        }
        for (let i = 0; i < newArr.length; i++) {
            msgList.push(subscribeMessage(sendData, newArr[i]))
        }
        let list = await Promise.all(msgList);
        
        const log = cloud.logger();
        log.info({ name: '_send_log',list: list });

        for(let i=0;i<list.length;i++){
            let _id = list[i].item._id;
            db.collection('msg_send').where({ _id: _id }).remove()
        }
        var res = {
            errcode:200,
            msg: "操作成功!",
            result:{},
            success:true,
            timestamp:new Date().getTime()
        }
    }catch (error) {
        var res = {
             errcode:404,
             msg: "网络错误",
             result:{},
             success:false,
             timestamp:new Date().getTime()
        }
    }
    return res;
}

function subscribeMessage(_send, item) {
    return new Promise(async (resolve, reject) => {
        try {
            let data = Object.assign(_send, {
                touser: item.openId,
                templateId: item.id,
            })
            await cloud.openapi.subscribeMessage.send(data);
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