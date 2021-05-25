const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
Page({
    data: {
        userInfo:{},
        itemDetail:{},
        postCommentValue:"",
        placeholder:"请输入评论内容...",
        target_user:{},
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
        this.setComment(res)
    },

    onShow: function () {

    },
    setComment(res){
        let comment = res.comment||[]
        comment = comment.map(item=>{
            item.time = common.moment(new Date(res.create_time)).format("YYYY-MM-DD HH:mm:ss")
            return item;
        })
        for(let i=0;i<comment.length-1;i++){
            for(let j=0;j<comment.length-1;j++){
                if(comment[i]._id==comment[j+1].target_user._id){
                    let list = comment[i].targetList||[]
                    list.push(comment[j+1])
                    comment[j+1].show = true;
                    comment[i].targetList = list;
                }
            }
        }
        comment = comment.filter(item=>{ return !item.show; })
        res.comment = comment
        this.setData({
            itemDetail:res
        })
    },
    selClickTarget(e){
        let { item } = e.currentTarget.dataset;
        this.setData({
            target_user:item,
            placeholder:"正在回复@"+item.userInfo.nickName
        })
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
        let data = {
            msg:this.data.postCommentValue,
            pro_id:this.data.itemDetail._id,
            userInfo:this.data.userInfo,
            target_user:this.data.target_user
        }
        Api.formatCommentt(data).then(res=>{
            if(res.success){
                res= res.result||{}
                let itemDetail = this.data.itemDetail;
                itemDetail.comment.push(Object.assign(data,{
                    time:common.moment().format("YYYY-MM-DD HH:mm:ss"),
                    openId:itemDetail.openId
                }))
                this.setComment(itemDetail)
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