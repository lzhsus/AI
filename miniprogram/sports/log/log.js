const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
Page({
    data: {
        stepList:[]
    },
    onLoad (options) {
        Api.wxRunInfo().then(res=>{
            if(res['success']){
                res = res.result||{};
                let list = (res.list||[]).map(item=>{
                    item['calorie_t'] = common.formatMoney(item['calorie']);
                    item['step_t'] = common.formatMoney(item['step']||0,0);
                    item['distance_t'] = common.formatMoney((item['distance']/1000));

                    item['time'] = common.moment(item.timestamp*1000).format("YYYY-MM-DD");
                    return item;
                })
                this.setData({
                    stepList:list
                })
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel:false
                })
            }
        })
    },
    onShow: function () {

    },
})