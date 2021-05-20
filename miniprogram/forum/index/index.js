const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
Page({
    data: {
        forumList:[],
        userInfo:{}
    },
    async onLoad(opt) {        
        mixinsIndex.onLoad(opt);
        this.getUserInfo()
    },
    getFormatList(){
        Api.formatList().then(res=>{
            if(res.success){
                res = res.result||{}
                this.setData({
                    forumList:res.list.map(item=>{ 
                        item.create_time = common.moment(item.create_time).format("YYYY-MM-DD HH:mm:ss")
                        return item;
                     })
                })
            }else{
                wx.showModal({
                    content:res.msg,
                    showCancel:false
                })
            }
        })
    },
    openDetail(e){
        let { id } = e.currentTarget.dataset
        wx.navigateTo({
            url: '/forum/detail/detail?_id='+id,
        })
    },
    openPageUp(){
        wx.navigateTo({
            url: '/forum/create/create'
        })
    },
    onShow: function () {
        this.getFormatList()
    },
    getUserInfo(){
        Api.userInfo().then(res=>{
            if(res.success){
                res = res.result||{};
                this.setData({
                    userInfo:res
                })
				common.LS.put('userinfo_count',res);
            }else{
                wx.showModal({
                    content:res.msg,
                    showCancel:false
                })
            }
            this.setData({
                pageShow:true
            })
        })
    },
})