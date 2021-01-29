const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config'
Page({
    data: {
        rankingList:[]
    },
    onLoad (options) {
        this.getUserRankinglist()
    },
    onShow: function () {

    },
    // 上拉监控
    onPullDownRefresh(){    
        appConfig.stopPullDownRefresh = true
        this.getUserRankinglist()
    },
    getUserRankinglist(){
        Api.userRankinglist().then(res=>{
            if(res.success){
                res = res.result||{}
                let list = res.list||[]
                list = list.map(item=>{
                    item.timetext = common.formatSeconds(item.time,'zh')+''
                    return item
                })
                this.setData({
                    rankingList:list
                })
                if( appConfig.stopPullDownRefresh ) {
                    wx.stopPullDownRefresh()
                    appConfig.stopPullDownRefresh = false
                }
            }else{
                wx.showModal({
                    content:res.msg,
                    showCancel:false
                })
            }
        })
    }
})