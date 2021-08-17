import * as echarts from '../../utils/echart/echarts';
const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
Page({
    data: {
        pageShow:'',
        gameUserInfo:{},
        levels:[]
    },
    async onLoad (options) {
        let res = await Api.answergameApiInfo();
        if(!res.success){
            wx.showModal({
                content: res.msg,
                showCancel:false
            })
            return
        }
        res = res.result||{}
        console.log(res)
        this.setData({
            gameUserInfo:res
        })
        this.getAnswergameApiLevels()
    },
    getAnswergameApiLevels(){
        return Api.answergameApiLevels().then(res=>{
            if(res.success){
                res = res.result||{};
                let list = (res.list||[]).map(item=>{
                    item.curGrade = common.gradeImage(item.level)
                    return item;
                })
                this.setData({
                    pageShow:"index",
                    levels:list
                })
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel:false
                })
            }
        });
    },
    openClickLevel(e){
        let { item } = e.currentTarget.dataset;
        // 检查当前关卡是否开启
        if(false){
            wx.showToast({
              title: '您暂未开启当前关卡！',
              icon:"none"
            })
            return
        }
        wx.navigateTo({
          url: '/challenge/qa/qa?code='+item.code,
        })
    },
    onShow: function () {

    },
})