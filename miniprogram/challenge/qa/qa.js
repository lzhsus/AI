const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
Page({
    data: {
        pageShow:'',
        qaList:[],
        qaItem:{},
        index:0,
        resultData:[]
    },
    async onLoad (opt) {
        this.getAnswergameApiLevelsdetail(opt.code)
    },
    getAnswergameApiLevelsdetail(code){
        return Api.answergameApiLevelsdetail({count:false,code:code}).then(res=>{
            if(res.success){
                res = res.result||[]
                let list = res.map(item=>{
                    item.choice = ''
                    return item;
                })
                console.log(res)
                this.setData({
                    qaList:list,
                    qaItem:list[0],
                    pageShow:'index'
                })
            }else{
                wx.showModal({
                    content:res.msg,
                    showCancel:false
                })
            }
        })
    },
    // 选择其中一题
    async choiceQaItem(e){
        let { key } = e.currentTarget.dataset;
        let { resultData,qaItem } = this.data;
        qaItem.qa_choice = key;
        // 得分
        qaItem.isScore = 0;
        if(key==qaItem.qa.result){
            qaItem.isScore = 1;
        }
        resultData.push(qaItem)
        this.setData({
            resultData:resultData,
            qaItem:qaItem
        })
        // 记录这一题结果
        wx.showLoading({
          title: '加载中...',
        })
        let item = JSON.parse(JSON.stringify(qaItem));
            delete item._id;
        await Api.answergameApiQaAnswerItem(item)
        wx.hideLoading()
        this.nextQaItem()
    },
    // 
    nextQaItem(){
        let { index,qaList } = this.data;
        index = index+1;
        // 最后一题
        console.log(index,qaList.length)
        if(index>=qaList.length){
            this.getAnswergameApiCreate()
            return
        }
        this.setData({
            qaItem:qaList[index],
            index:index
        })
    },
    setResultData(){
        let resultData = this.data.resultData;
        let data = {
            score:resultData.filter(item=>{ return item.isScore }).length,
            code:resultData[0].code,
            level:resultData[0].level,
            qa_id:resultData[0].qa_id,
            data:resultData
        }
        return data;
    },
    // 提交结果
    getAnswergameApiCreate(){
        let data = this.setResultData()
        console.log(data)
        Api.answergameApiCreate(data).then(res=>{
            if(res.success){
                res = res.result||{};

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