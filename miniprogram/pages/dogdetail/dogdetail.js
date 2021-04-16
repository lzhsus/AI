
const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
Page({
    data: {
        pageShow:false,
        dataDetail:{},
        petid:'',
        coverurl:'',
        type:1
    },
    onLoad (opt) {
        console.log(opt)
        mixinsIndex.onLoad(opt);
        this.setData({
            petid:opt.petid,
            coverurl:opt.coverurl,
            type:opt.type||1
        })
        this.getDetail()
    },
    getDetail(){
        if(this.data.type==1){
            this.getDogDetail()
        }else{
            this.getReptileDetail()
        }
    },
    getDogDetail(){
        Api.dogDetail({
            petID:this.data.petid
        }).then(res=>{
            console.log(res)
            if(res['success']){
                res = res.result||{}
                this.setData({
                    dataDetail:res,
                    pageShow:true
                })
            }else{
                if(res.errcode==-1) Api.chongwuupdata({type:this.data.type,petID:this.data.petid})
                wx.showModal({
                    content: res.msg,
                    showCancel:false,
                    success:()=>{
                        if(res.errcode==-1){
                            wx.navigateBack()
                        }
                    }
                })
            }
        })
    },
    getReptileDetail(){
        Api.reptileDetail({
            petID:this.data.petid
        }).then(res=>{
            if(res['success']){
                res = res.result||{}
                this.setData({
                    dataDetail:res,
                    pageShow:true
                })
            }else{
                if(res.errcode==-1) Api.chongwuupdata({type:this.data.type,petID:this.data.petid})
                wx.showModal({
                    content: res.msg,
                    showCancel:false,
                    success:()=>{
                        if(res.errcode==-1){
                            wx.navigateBack()
                        }
                    }
                })
            }
        })
    },
    onShow: function () {

    },
})