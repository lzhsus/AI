const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
Page({
    data: {
        userInfo:{},
        itemDetail:{},
        postCommentValue:""
    },
    async onLoad(opt) {        
        mixinsIndex.onLoad(opt);
        this.getUserInfo()
        if(!opt._id){
            wx.showModal({
                content: '文章id不存在！',
                showCancel:false,
                success:()=>{
                    wx.switchTab({
                      url: '/pages/my/my',
                    })
                }
            })
            return
        }
        let res = await Api.formatDetail({_id:opt._id})
        if(!res.success){
            wx.showModal({
                content: res.msg,
                showCancel:false
            })
            return
        }
        res = res.result||{}
        res.comment = res.comment.map(item=>{
            item.time = common.moment(new Date(res.create_time)).format("YYYY-MM-DD HH:mm:ss")
            return item;
        })
        this.setData({
            itemDetail:res
        })
    },
    onShow: function () {

    },
    bindinput(e){
        this.setData({
            postCommentValue:e.detail.value
        })
    },
    bindconfirm(){
        console.log(this.data.itemDetail)
        if(!this.data.postCommentValue){
            wx.showToast({
                title: '评论信息不可为空！',
                icon:"none",
                duration:2000
            })
            return
        }
        Api.formatCommentt({
            msg:this.data.postCommentValue,
            pro_id:this.data.itemDetail._id,
            userInfo:this.data.userInfo,
            target_user:{}
        }).then(res=>{
            if(res.success){
                res= res.result||{}
                this.setData({
                    postCommentValue:''
                })
                wx.showToast({
                    title: '评论成功！',
                    icon:"none",
                    duration:2000
                })
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel:false
                })
            }
        })
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
    onShareAppMessage(e){
        let shareObj = {}
        if(e.from=='button'){
            let { id,imageurl,name } = e.target.dataset
            shareObj = {
                title:name,
                imageUrl:imageurl,
                path:"/forum/detail/detail?_id="+id
            }
        }else{
            shareObj = {
                title:"H羞羞语言",
                imageUrl:"",
                path:"/pages/my/my"
            }
        }
        return shareObj;
    }
})