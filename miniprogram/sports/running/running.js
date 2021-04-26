const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
let run = 0;
let intervalTime = null;
Page({
    data: {
        pageShow:'',
        startRuning:false,
        init:{
            longitude: 0,
            latitude: 0
        },
        polyline: [{
            points: [],
            color: "#436EEE",
            width: 2,
        }],
        markers:[]
    },
    onLoad: function (options) {
        common.enableAlertBeforeUnload()
    },
    onShow: function () {
        if(common.LS.get("runing")==1){
            this.startRuningTap()
        }else{
            this.setData({
                startRuning:false
            })
            this.wxGetLocation()
        }
    },
    onHide(e){
        common.LS.put("runing",1,1/24);
        
        if(intervalTime){
            clearInterval(intervalTime)
        }
    },
    onUnload(){
        common.LS.remove("runing");
        if(intervalTime){
            clearInterval(intervalTime)
        }
    },
    startRuningTap(){
        this.setData({
            startRuning:true
        })
        this.wxSetTimeout()
    },
    wxSetTimeout(){
        intervalTime = setInterval(async () => {
            this.wxGetLocation()
        }, 2000);
    },
    async wxGetLocation(){
        let location = await common.getReverseGeocoder();
        if(location.lat&&location.lng){
            if(!this.data.init.longitude&&!this.data.init.latitude){
                this.setData({
                    init:{
                        longitude: location.lng,
                        latitude: location.lat
                    },
                    markers:[{
                        id:1,
                        latitude:location.lat,
                        longitude:location.lng,
                        iconPath:"https://6c7a-lzhsus-1g4h29bs69c66542-1301447037.tcb.qcloud.la/static/image/per-loa.png",
                        width:20,
                        height:20,
                    }]
                })
            }else{
                let polyline = this.data.polyline;
                let points = polyline[0].points;
                if(points.length==0){
                    points.push({
                        longitude: location.lng,
                        latitude: location.lng
                    })
                }
                points.push({
                    longitude: location.lng,
                    latitude: location.lat
                })
                this.setData({
                    polyline:polyline,
                    init:{
                        longitude: location.lng,
                        latitude: location.lat
                    }
                })
            }
        }
    },
})