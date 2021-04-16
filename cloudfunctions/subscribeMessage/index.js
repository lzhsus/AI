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
exports.main = async (event, context) => {
    const {
        OPENID
    } = cloud.getWXContext();
    let parsms = event.data;
    const log = cloud.logger()
    let sendData = {
        page: 'pages/my/my',
        data: {
            thing2: { //奖励
                value: "每日签到获得相应的奖励次数~"
            },
            time3: { //签到时间
                value: new Date().getTime()
            }
        }
    }
    var user = await db.collection('msg_send')
        .aggregate()
        .limit(9999)
        .end()
    let total = 0;
    let msgList = []
    if (user && user.list && user.list.length) {
        let newArr = [...new Set(user.list)]; // 这个方法最简便
        total = newArr.length;
        for (let i = 0; i < newArr.length; i++) {
            msgList.push(subscribeMessage(sendData, newArr[i]))
        }
        Promise.all(msgList).then(async item => {
            for(let i=0;i<item.length;i++){
                await db.collection('msg_send').where({
                    _id: item[i]._id
                }).remove()
            }
            let send = {
                name: "_send",
                total: total,
                success: item.filter(_s => {
                    return _s.code==1;
                }).length,
                lose: item.filter(_s => {
                    return _s.code==0;
                }).length,
                item:item,
                newArr:newArr,
                time: new Date().getTime()
            }
            log.info(send)
        })
    }
    var res = {
        errcode: 200,
        msg: "操作成功!",
        result: {},
        success: true,
        timestamp: new Date().getTime()
    }
    return res;
}

function subscribeMessage(sendData, item, _id) {
    return new Promise(async (resolve, reject) => {
        try {
            let data = Object.assign(sendData, {
                touser: item.openId,
                templateId: "SaHm16y6Cjdod2w_EgbZhyhjUyKA4U72QRTUwjAJE30",
                lang: 'zh_CN',
            })
            await cloud.openapi.subscribeMessage.send(data)
            resolve({code:1,_id:item._id})
        } catch (error) {
            resolve({code:0,_id:item._id})
        }
    })
}
