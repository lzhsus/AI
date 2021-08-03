
const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
Page({
    data: {
        todayDayList:[],
        code:''
    },
    onLoad: function (options) {
        this.getCaipiaoList()
    },
    getCaipiaoList(){
        Api.caipiaoList({
            day:''
        }).then(res=>{
            if(res.success){
                res = res.result||{}
                let list = (res.list||[]).map(item=>{
                    // item.day2 = common.moment(item.day).format("YYYY-MM-DD");
                    return item;
                })
                console.log('list',list)
                let arr = []
                for(let i=0;i<list.length;i++){
                    // 检查是否存在
                    if(arr.some(item=>{ return list[i].day2==item.day2 })){
                        for(let j=0;j<arr.length;j++){
                            if(arr[j].day2==list[i].day2){
                                arr[j].win_code = list[i].win_code||arr[j].win_code
                                arr[j].list2.push(list[i])
                            }
                        }
                    }else{
                        arr.push({
                            day2:list[i].day2,
                            win_code:list[i].win_code||'',
                            list2:[list[i]]
                        })
                    }
                }
                arr.forEach(item=>{
                    if(item.win_code&&item.win_code.length){
                        let list01 = item.win_code.slice(0,5);
                        let list02 = item.win_code.slice(5);
                        item.list2 = item.list2.map(obj=>{
                            let oneNum = 0;
                            let towNum = 0;
                            obj.list.forEach(element=>{
                                element.show = false;
                                if(element.type==1){
                                    if(list01.indexOf(element.num)!=-1){
                                        element.show = true
                                        oneNum++
                                    };
                                }
                                if(element.type==2){
                                    if(list02.indexOf(element.num)!=-1){
                                        element.show = true
                                        towNum++
                                    };
                                }
                            })
                            obj.price = 0
                            if(oneNum==5&&oneNum==2){
                                obj.price = '1A+0'
                            }else if(oneNum==5&&oneNum==1){
                                obj.price = '1B+0'
                            }else if(oneNum==5&&oneNum==0){
                                obj.price = 10000
                            }else if(oneNum==4&&oneNum==2){
                                obj.price = 3000
                            }else if(oneNum==4&&oneNum==1){
                                obj.price = 300
                            }else if(oneNum==4&&oneNum==0){
                                obj.price = 100
                            }else if(oneNum==3&&oneNum==2){
                                obj.price = 200
                            }else if(oneNum==3&&oneNum==1||oneNum==2&&oneNum==2){
                                obj.price = 15
                            }else if(oneNum==3&&oneNum==0||oneNum==2&&oneNum==1||oneNum==1&&oneNum==2||oneNum==0&&oneNum==2){
                                obj.price = 5
                            }else{
                                obj.price = 0
                            }
                            obj.price = obj.price+''
                            console.log(obj.price)
                            console.log(oneNum,towNum)
                            return obj;
                        })
                    }
                })
                console.log('arr',arr)
                this.setData({
                    todayDayList:arr
                })
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel:false
                })
            }
        })
    },
    selectTodayTiem(e){
        let { index } = e.currentTarget.dataset;
        let item = this.data.todayDayList[index]
        if(item.win_code.length){
            wx.showToast({
                title: '该日期已发布！',
                icon:"none"
            })
            return 
        }
        wx.showToast({
            title: '已标记时间'+item.day2,
            icon:"none"
        })
        this.setData({
            day2:item.day2
        })
    },
    openChangeRule(){
        this.setData({
            popShow:'rule'
        })
    },
    cloreChangeRule(){
        this.setData({
            popShow:''
        })
    },
    inputCode(e){
        let { value } = e.detail
        this.setData({
            code:value
        })
    },
    submitWinCode(){
        if(!this.data.code){
            wx.showToast({
                title: '请输入中奖code',
                icon:"none"
            })
            return
        }
        Api.caipiaoWincodeUpdata({
            win_code:this.data.code,
            day2:this.data.day2||common.moment().format("YYYY-MM-DD")
        }).then(res=>{
            if(res.success){
                res = res.result||{}
                wx.showToast({
                    title: '提交成功！',
                    icon:"none"
                })
                this.getCaipiaoList()
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