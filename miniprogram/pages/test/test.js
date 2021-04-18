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
    async onShow () {
        // let res = {}
        // let list = res.result.petFamilyList;
        // console.log(list);
        // for(let i=0;i<list.length;i++){
        //     if(i==0) continue
        //     await Api.wxServerApiUpdata({
        //         name:"pet_list",
        //         data:Object.assign(list[i],{
        //             type:4
        //         })
        //     })
        // }
    },
})