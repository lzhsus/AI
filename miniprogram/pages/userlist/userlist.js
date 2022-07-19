const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
let globleUserList = []
let postApi;
Page({
    data: {
        pageShow:false,
        userlist:[],
        superList:[],
        generalList:[],
        searchValue:'',

        page:1,
    },
    async onLoad (options) {
        await this.getuserlist()
        this.setData({
            pageShow:true
        })
    },
    // 到底监控
    onReachBottom(){
        this.allUserList();
    },
    onSearchChange(e){
        let value = e.detail;
        let list = globleUserList.filter(item=>{ 
            let nickName = (item.nickName+'').indexOf(value)!=-1?true:false;
            let isOpenId = (item.openId+'').indexOf(value)!=-1?true:false;

            return isOpenId||nickName;
        })
        this.updataViewList(list)
    },
    onSearchClear(){
        this.setData({
            searchValue:''
        })
        this.updataViewList(globleUserList)
    },
    allUserList(){
        if(postApi) return
        postApi = true
        console.log("--------------------------",this.data.userlist.length)
        setTimeout(()=>{
            let list = JSON.parse(JSON.stringify(globleUserList))
            var data = list.splice(this.data.userlist.length,10)
            this.data.userlist = this.data.userlist.concat(data);
            this.setData({
                userlist:this.data.userlist
            })
            postApi = false
        },1000)
    },
    getuserlist(){
        return Api.apiUserlist().then(res=>{
            if(res.success){
                res = res.result||{}
                let list = res.list.map(item=>{
                    item.create_time = common.moment(item.create_time).format("YYYY-MM-DD HH:MM:SS")
                    return item;
                })
                globleUserList = list;
                this.updataViewList(list);
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel:false
                })
            }
        })
    },
    updataViewList(list){
        let superList = list.filter(item=>{ return item.isSuperAdmin==1; })
        let generalList = list.filter(item=>{ return item.isAdmin==1; })
        console.log('generalList',generalList)
        console.log('list',list)
        console.log('superList',superList)
        this.setData({
            superList:superList,
            generalList:generalList
        })
        this.allUserList()
    },
    copyClick(e){
        console.log(e)
        let { openid } = e.currentTarget.dataset;
        wx.setClipboardData({
            data: openid,
            success: function (res) {
                wx.showToast({
                  title: '复制成功',
                  icon:"none"
                })
            }
        })
    },
    async changeAdmin(e){
        let list = this.data.userlist;
        let { item,name } = e.currentTarget.dataset;
        let isSuperAdmin = item.isSuperAdmin==1?1:0;
        let isAdmin = item.isAdmin==1?1:0;
        let isCaipiao = item.isCaipiao==1?1:0;
        let isCommunity = item.isCommunity==1?1:0;

        if(name=='isSuperAdmin'){
            isSuperAdmin = isSuperAdmin==1?0:1;
        }
        if(name=='isAdmin'){
            isAdmin = isAdmin==1?0:1;
        }
        if(name=='isCaipiao'){
            isCaipiao = isCaipiao==1?0:1;
        }
        if(name=='isCommunity'){
            isCommunity = isCommunity==1?0:1;
        }
        let res = await Api.apiUserUpdataadmin({
            _id:item._id,
            isAdmin:isAdmin,
            isSuperAdmin:isSuperAdmin,
            isCaipiao:isCaipiao,
            isCommunity:isCommunity
        })
        if(!res.success){
            wx.showModal({
                content: res.msg,
                showCancel:false
            })
            return
        }
        // 全部数据
        list = list.map(data=>{
            if(data._id==item._id){
                data[name] = !data[name];
            }
            return data;
        })
        this.updataViewList(list)
    },
    onShow: function () {

    },

})