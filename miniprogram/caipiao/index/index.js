const Verse = require('../../utils/jinrishici.js');
const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
Page({
    data: {
        frontNumber: [],
        backzoneNumber: [],
        resultList:[],
        todayDayList:[],
        todayDay:''
    },
    async onLoad (options) {
        let res =  await Api.userInfo();
        if(!res.success){
            wx.showModal({
                content: res.msg,
                showCancel:false
            })
        }
        res = res.result||{}
        if(res.isSuperAdmin!=1) return;
        wx.setNavigationBarTitle({
            title: '超级大乐透'
        })
        let arr = this.getNumberList(35)
        let arr2 = this.getNumberList(12)
        this.setData({
            frontNumber: arr,
            backzoneNumber: arr2
        })
        this.getCaipiaoList()
        await Api.updataPeriod()
        await Api.updatacode()
    },
    openPageHistory(){
        wx.navigateTo({
          url: '/caipiao/history/history',
        })
    },
    getNumberList(num) {
        let arr = []
        for (let i = 1; i <= num; i++) {
            arr.push({
                show: false,
                num: i < 10 ? '0' + i : i + ''
            })
        }
        return arr;
    },
    randomClickNumber() {
        let arr01 = [],arr02 = []
        for(let i=0;i<35;i++){
            arr01.push(i)
        }
        for(let i=0;i<12;i++){
            arr02.push(i)
        }
        function getRandom(s,len) {
            s.sort(function () {
                return 0.5 - Math.random()
            });
            
            return s.slice(0,len);
        }
        let result01 = getRandom(arr01,5);
        let result02 = getRandom(arr02,2);
        let { frontNumber,backzoneNumber } = this.data;
        for(let i=0;i<frontNumber.length;i++){
            frontNumber[i].show = false
        }
        for(let i=0;i<backzoneNumber.length;i++){
            backzoneNumber[i].show = false
        }
        let list01=[],list02=[];
        for(let i=0;i<result01.length;i++){
            frontNumber[result01[i]].show = true;
            list01.push(frontNumber[result01[i]].num)
        }
        for(let i=0;i<result02.length;i++){
            backzoneNumber[result02[i]].show = true;
            list02.push(frontNumber[result02[i]].num)
        }
        list01.sort()
        list02.sort()
        
        this.setData({
            frontNumber:frontNumber,
            backzoneNumber:backzoneNumber,
            resultList:list01.map((num)=>{ return {type:1,num:num} }).concat(list02.map((num)=>{ return {type:2,num:num} }))
        })
    },
    async submitClickBtn(){
        let { frontNumber,backzoneNumber } = this.data;
        await Api.updataPeriod()
        Api.caipiaoCreate({
            day2:common.moment().format("YYYY-MM-DD"),
            day:common.moment().format("YYYY-MM-DD HH:MM:SS"),
            list:this.data.resultList
        }).then(res=>{
            if(res.success){
                res = res.result||{}
                this.getCaipiaoList()
                wx.showModal({
                    content: '记录成功',
                    showCancel:false,
                    success:()=>{
                        for(let i=0;i<frontNumber.length;i++){
                            frontNumber[i].show = false
                        }
                        for(let i=0;i<backzoneNumber.length;i++){
                            backzoneNumber[i].show = false
                        }
                        this.setData({
                            frontNumber:frontNumber,
                            backzoneNumber:backzoneNumber,
                            resultList:[]
                        })
                    }
                })
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel:false
                })
            }
        })
    },
    getCaipiaoList(){
        let todayDay = common.moment().format("YYYY-MM-DD");
        this.setData({
            todayDay:todayDay
        })
        Api.caipiaoList({
            day:todayDay
        }).then(res=>{
            if(res.success){
                res = res.result||{}
                let list = (res.list||[]).map(item=>{
                    item.day = common.moment(item.day).format("YYYY-MM-DD")
                    return item;
                })
                this.setData({
                    todayDayList:list
                })
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel:false
                })
            }
        })
    },
    onShow: function () {

    },
})