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