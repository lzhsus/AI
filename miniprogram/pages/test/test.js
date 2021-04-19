const Api = require('../../services/api/index');
import * as echarts from '../../utils/echart/echarts';
let wxNode=null,chart=null;
import moment from '../../utils/moment.min';

Page({
    data: {
        ec:{}
    },
    async onLoad(options) {
        // Api.cloud_userInfo().then(res=>{
        //     if(res['success']){
        //         console.log(res)
        //     }else{

        //     }
        // })
        // wx.cloud.callFunction({
        //     name:"subscribeMessage"
        // })

        wx.getWeRunData({
            success:(res)=> {
                // 或拿 cloudID 通过云调用直接获取开放数据
                const cloudID = res.cloudID
                Api.wxServerApiRun({
                    weRunData: wx.cloud.CloudID(res.cloudID)
                }).then(res=>{
                    if(res['success']){
                        res = res.result||{};
                        let day = 7;
                        let times = res.stepInfoList.map((item,index)=>{
                            return moment((new Date(new Date(item.timestamp*1000)))).format("MM/DD");
                        }).filter((res,index)=>{ return index<day})
                        let values = res.stepInfoList.map((item,index)=>{
                            return item.step
                        }).filter((res,index)=>{ return index<day})

                        this.initChart(values,times)
                    }
                })
            }
        })
    },
    
    async echartBarInit({detail}){
        wxNode = detail.wxNode;
        chart = null;
        chart = echarts.init(detail.canvas, null, {
            width: detail.width,
            height: detail.height,
            devicePixelRatio: detail.dpr
        });
        detail.canvas.setChart(chart);
    },
    initChart(values,times) {
        console.log('chart',chart)
        if(chart==null){
            setTimeout(res=>{ this.initChart(seriesData) },500);
            return;
        }
        var option  = {
            color:['yellow'],
            xAxis: [{
                data: times.map(res=>{ return Object.assign({},{value:res,textStyle:{color:"#ffffff"}}) }),
                axisTick:{
                    show:false,
                    opacity:0,
                    lineStyle:{
                        opacity:0,
                        color:"red"
                    }
                }
            }],
            yAxis: [{ 
                show:false,
                type: 'value',
            }],
            series: [{
                type: 'line',
                areaStyle: {},
                data: values,
                nameTextStyle:{
                    color:"#ffffff"
                }
            }]
        };
        chart.setOption(option);
        wxNode.chart = chart;
    },
    async onShow() {
        // let res = {}
        // let list = res.result.petFamilyList;
        // console.log(list);
        // for(let i=0;i<list.length;i++){
        //     if(i==0) continue
        //     await Api.wxServerApiUpdata({
        //         name:"pet_list",
        //         data:Object.assign(list[i],{
        //             type:4
        //         })
        //     })
        // }
    },
})