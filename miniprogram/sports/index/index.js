const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
Page({
    data: {
        runInfo:{}
    },
    onLoad (options) {
        this.getWxRunInfo()
    },
    onShow: function () {

    },
    getWxRunInfo(){
        Api.wxRunInfo().then(res=>{
            if(res['success']){
                res = res.result||{};
                res.total['calorie_t'] = common.formatMoney(res.total['calorie']);
                res.total['step_t'] = common.formatMoney(res.total['step']||0);
                res.total['distance_t'] = common.formatMoney((res.total['distance']/1000));

                res.today['calorie_t'] = common.formatMoney(res.today['calorie']);
                res.today['step_t'] = common.formatMoney(res.today['step']||0);
                res.today['distance_t'] = common.formatMoney((res.today['distance']/1000));
                res.schedule = common.scheduleLoading(res.today['step'],6000,180)
                console.log(res.schedule)
                this.setData({
                    runInfo:res
                })
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel:false
                })
            }
        })
    }
})