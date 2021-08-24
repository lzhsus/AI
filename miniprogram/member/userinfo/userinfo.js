const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
Page({
    data: {
        userInfo:{},
        pageShow:"",
        mobile:''
    },
    onLoad(options) {
        this.getUserInfo()
    },
    getUserInfo(){
        Api.userInfo().then(res=>{
            if(res.success){
                res = res.result||{};
                this.setData({
                    userInfo:res,
                    pageShow:"index"
                })
            }else{
                wx.showModal({
                    content:res.msg,
                    showCancel:false
                })
            }
        })
    },
    inputUserInfoChange(e){
        let { name } = e.currentTarget.dataset;
        let value = e.detail.value;
        this.setData({
            mobile:value
        })
    },
    submitClick(){
        if(!this.data.mobile){
            wx.showToast({
                title: '请输入手机号',
                icon:'none'
            })
            return;
        }
        if(!(/^1\d{10}$/).test(this.data.mobile)){
            wx.showToast({
                title: '请输入正确的电话号码',
                icon:'none'
            })
            return;
        }	
        Api.fieldUpdata({
            name:"user_info",
            data:{
                mobile:this.data.mobile
            }
        }).then(res=>{
            if(res.success){
                res = res.result||{}
                wx.showToast({
                    title:"更新成功",
                    icon:"none"
                })
                this.data.userInfo.mobile = this.data.mobile;
                this.setData({
                    userInfo:this.data.userInfo
                })
				common.LS.put('userinfo_count',this.data.userInfo);
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel:false
                })
            }
        })
    },
    onShow() {

    },
})