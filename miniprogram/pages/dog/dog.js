
const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
Page({
    data: {
        pageShow:false,
        dogList:[],
        tabIndex:1
    },
    async onLoad (opt) {
        mixinsIndex.onLoad(opt);
        this.getDataList()
    },
    getDataList(){
        if(this.data.tabIndex==1){
            this.getDogList()
        }else{
            this.getReptileList()
        }
    },
    getDogList(){
        Api.dogList().then(res=>{
            if(res['success']){
                res = res.result||{}
                this.setData({
                    dogList:res.list||[],
                    pageShow:true
                })
            }else{
                wx.showModal({
                    content: res.msg,
                  })
            }
        })
    },
    getReptileList(){
        Api.reptileList().then(res=>{
            if(res['success']){
                res = res.result||{}
                this.setData({
                    dogList:res.list||[],
                    pageShow:true
                })
            }else{
                wx.showModal({
                    content: res.msg,
                  })
            }
        })
    },
    tabChangeClick(e){
        let {id} = e.currentTarget.dataset;
        this.setData({
            tabIndex:id
        })
        this.getDataList()
    },
    openDogDetail(e){
        let {petid,coverurl,type} = e.currentTarget.dataset;
        console.log(e)
        wx.navigateTo({
          url: '/pages/dogdetail/dogdetail?petid='+petid+"&coverurl="+coverurl+'&type='+type,
        })
    },
    onShow: function () {

    },
})