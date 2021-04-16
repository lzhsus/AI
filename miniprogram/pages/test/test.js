const Api = require('../../services/api/index');

Page({
    data: {

    },
    async onLoad (options) {
        // Api.cloud_userInfo().then(res=>{
        //     if(res['success']){
        //         console.log(res)
        //     }else{
                
        //     }
        // })
        wx.cloud.callFunction({
            name:"subscribeMessage"
        })
    },
    onShow: function () {

    },
})