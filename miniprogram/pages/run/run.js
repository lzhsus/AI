Page({

    data: {

    },

    onLoad: function (options) {

    },
    weRunData(){
        wx.getWeRunData({
            success:(res)=> {
                Api.wxServerApiRun({
                    weRunData: wx.cloud.CloudID(res.cloudID)
                }).then(res=>{
                    if(res['success']){
                        res = res.result||{};

                    }
                })
            },
            fail:(res)=>{
                console.log(res);
            }
        })
    },
    onShow: function () {

    },
})