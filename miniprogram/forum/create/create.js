const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
import {
    setShareImgLink,
    uploadFiles
} from '../../services/uploadFile.js';
Page({
    data: {
        userInfo:{},
        img_url:''
    },
    async onLoad(opt) {        
        mixinsIndex.onLoad(opt);
        this.getUserInfo()
    },
    onShow: function () {

    },
    getUserInfo(){
        Api.userInfo().then(res=>{
            if(res.success){
                res = res.result||{};
                if(!res.avatarUrl){
                    wx.showModal({
                        content: '您当前暂未获取用户信息，请先到我的页面完成签到',
                        showCancel:false,
                        success:()=>{
                            wx.switchTab({
                              url: '/pages/my/my',
                            })
                        }
                    })
                }
                this.setData({
                    userInfo:res
                })
            }
        })
    },
    bindinput(e){
        let { value } = e.detail
        this.setData({
            desc:value
        })
    },
    openImageClick(){
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: async (res) => {
                // tempFilePath可以作为img标签的src属性显示图片
                let tempFilePaths = res.tempFilePaths;
                this.setData({
                    img_url:tempFilePaths[0]
                })
            }
        })
    },
    async submitClick(){
        if(!this.data.desc||!this.data.img_url){
            wx.showModal({
                content: '请选择图片已经信息描述！',
                showCancel:false
            })
            return
        }
        wx.showLoading({
            title:'加载中',
            mask:true
        });
        let image = await common.compressImage2(this.data.img_url);
        var images = await uploadFiles([image], 'forum')
        Api.formatUp({
            desc:this.data.desc,
            img_url:images[0].fileID.replace("cloud://lzhsus-1g4h29bs69c66542.6c7a-lzhsus-1g4h29bs69c66542-1301447037/","https://6c7a-lzhsus-1g4h29bs69c66542-1301447037.tcb.qcloud.la/"),
            userInfo:{
                avatarUrl:this.data.userInfo.avatarUrl,
                nickName:this.data.userInfo.nickName,
                openId:this.data.userInfo.openId,
                unionId:this.data.userInfo.unionId||"",
                gender:this.data.userInfo.gender||"",
            }
        }).then(res=>{
            wx.hideLoading()
            if(res.success){
                wx.showToast({
                    title: '提交成功',
                })
                setTimeout(()=>{
                    wx.navigateBack()
                },1000)
            }else{
                wx.showModal({
                    content:res.msg,
                    showCancel:false
                })
            }
        })
    }
})