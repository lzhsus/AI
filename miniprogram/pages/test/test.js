const Api = require('../../services/api/index');
import * as echarts from '../../utils/echart/echarts';
import * as common from '../../common/common';
let wxNode=null,chart=null;
import moment from '../../utils/moment.min';

Page({
    data: {
        ec:{},
        canvasWidth:1,
        canvasHeight:1
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
        // common.compressImage()
    },
    openClick(){
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success :async (res) =>{
                // tempFilePath可以作为img标签的src属性显示图片
                let tempFilePaths = res.tempFilePaths
                tempFilePaths = tempFilePaths.map(item=>{return {url:item}})
                console.log('压缩前》》',tempFilePaths[0].url)

                let list = await common.compressImage(tempFilePaths);
                if(list.some(item=>{ return !item.success })){
                    list = await common.compressImage(tempFilePaths,true);
                }

                
                wx.showShareImageMenu({
                    path: list[0].url,
                    fail: (res)=> {
                        console.log(res)
                        if( res.errMsg.indexOf('deny')!=-1||res.errMsg.indexOf('denied')!=-1 ){
                            wx.showToast({
                                title: '保存相册失败，请设置权限！',
                                icon: 'none',
                                duration: 2000,
                            })
                            this.settingShow = true;
                            this.settingType = 'scope.writePhotosAlbum';
                        }else{
                            wx.showToast({
                                title: '保存相册失败，请重试！',
                                icon: 'none',
                                duration: 2000,
                            });
                        }
                    }
                }); 
                console.log('压缩后》》',list[0].url)
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