const Verse = require('../../utils/jinrishici.js');
const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config'
Page({
    data: {
        pageShow:false,
        verseInfo:{},
        isTrue:true,
        countTime:10
    },
    onLoad(options) {
        this.createVerse()
    },
    onShow: function () {

    },
    countDownTime(){
        setTimeout(res=>{
            this.setData({
                countTime:this.data.countTime-1
            })
            if(this.data.countTime>0){
                this.countDownTime();
            }else{
                this.setData({
                    countTime:10,
                    isTrue:true
                })
            }
        },1000)
    },
    xjClick(){
        if(!this.data.isTrue) return;
        this.createVerse()
    },
    createVerse(){
        wx.showLoading({
            title:'加载中',
            mask:true
        });
        Verse.load(result => {
            console.log(result)
            wx.hideLoading()
            // 下面是处理逻辑示例
            function flatBack(stringText){
                return stringText.split('。').filter(item=>{ return item; }).map(item=>{
                    return item.split('，').filter(item2=>{ return item2; })
                }).flat()
            }
            function flatBack2(stringText){
                return stringText.split('。').filter(item=>{ return item; }).flat()
            }
            let data = {
                content:result.data.content,
                contentList:flatBack(result.data.content),
                id:result.data.id,
                matchTags:result.data.matchTags,
                origin:result.data.origin
            }
            if(data.origin&&data.origin.content&&data.origin.content.length){
                data.origin.content = data.origin.content.map(item=>{
                    item = item.replace(new RegExp('。','g'),'\n')
                    item = item.replace(new RegExp('？','g'),'\n')
                    return item
                })
            }
            console.log(data)
            this.setData({
                verseInfo:data,
                isTrue:false,
                pageShow:true
            })
            this.countDownTime()
            Api.verseCreate(data);
        })
    }
})