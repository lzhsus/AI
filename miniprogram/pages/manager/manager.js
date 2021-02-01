var plugin = requirePlugin("WechatSI")
Page({

    data: {
        isTouch:false,
        managerShow:false,
        managerItem:{}
    },
    onLoad(){
        let manager = plugin.getRecordRecognitionManager();
        let _this = this;
        manager.onRecognize = function(res) {
            console.log("current result", res.result)
        }
        manager.onStop = function(res) {
            console.log("record file path", res.tempFilePath)
            console.log("result", res.result)
            console.log("res", res)
            _this.setData({
                managerShow:false,
                managerItem:res
            })
        }
        manager.onStart = function(res) {
            _this.setData({
                managerShow:true
            })
        }
        manager.onError = function(res) {
            _this.setData({
                managerShow:false
            })
            console.error("error msg", res)
        }
    },
    startManagerTick(){
        manager.start({duration:30000, lang: "zh_CN"});
    },
    // 录音 按下
    bindtouchstart(){
        if( this.data.isTouch) return
        this.isTouch=true;
        wx.getSetting({
            success:(res)=>{
                console.log(res)
                if (res.authSetting['scope.record']) {
                    this.startRecord();
                }else{
                    this.isTouch = false
                    wx.authorize({
                        scope: 'scope.record',
                        success:()=>{
                            wx.showToast({
                                title: '请重新录音！',
                                icon: 'none',
                                duration: 2000
                            })
                        },
                        fail:(res2)=>{
                            console.log(3,res2)
                            wx.openSetting({
                                success:function(item){
                                    if (item.authSetting['scope.record']) {
                                        wx.showToast({
                                            title: '请重新录音！',
                                            icon: 'none',
                                            duration: 2000
                                        })
                                    }
                                }
                            })
                        }
                    }) 
                }
            }
        })
    },
    bindtouchmove(e){
        
    },
    // 松开
    bindtouchend(){
        this.isTouch = false;
    },
    onShow: function () {

    }
})