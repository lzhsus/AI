import * as echarts from '../../ec-canvas/echarts';
import * as common from '../../common/common';
const Api = require('../../services/api/index');
const app = getApp();
// import { data } from "https://2018-1258231492.cos.ap-shanghai.myqcloud.com/data.js"
let list = []
Page({
	onShareAppMessage: function (res) {
		return {
			title: 'ECharts 可以在微信小程序中使用啦！',
			path: '/pages/index/index',
			success: function () {},
			fail: function () {}
		}
	},
	data: {
		pageShow:false,
		ec: null,
		list:[]
	},
	initChart(canvas, width, height, dpr) {
		const chart = echarts.init(canvas, null, {
			width: width,
			height: height,
			devicePixelRatio: dpr // new
		});
		canvas.setChart(chart);

		var option = {
			title: {
				text: '上海地铁',
				left: 'center',
				top:"3%"
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					// type: 'cross',
					label: {
						backgroundColor: '#2772dd',
					},
				},
				backgroundColor: "#ffffff",
				textStyle:{
					color: "red",
				},
				formatter:function(params){
					return common.moment(params[0].name).format("YYYY-MM-DD") + ' ' +'(' + common.numberFormat(params[0].data) + ')'
				}
			},
			xAxis: {
				type: 'category',
				boundaryGap: true,
				data: list.map(item=>common.moment(item.time).format("YYYYMMDD")),
				axisLabel: {
					rotate: 60
				}
			},
			yAxis: {
				x: 'center',
				type: 'value',
				splitLine: {
					lineStyle: {
						type: 'dashed'
					}
				},
				axisLabel:{
					formatter:function(val){
						return common.numberFormat(val);
					}
				}
			},
			grid:{
			   //与绝对定位相似，top，left，right，bottom 设定是根据上级盒子宽高来计算
				top:"10%",
				left:"15%",
				right:"15%",
				bottom:"10%"
			},
			dataZoom: {
				type: "inside", //slider表示有滑动块的，inside表示内置的
				show: true,
				xAxisIndex: 0,
				start:(100/list.length)*(list.length-7),
				end:100
			},
			series: [{
				type: 'line',
				smooth: true,
				data: list.map(item=>item.num),
			}]
		};
		chart.setOption(option);
		console.log('--555---',option)
		return chart;
	},
	async onLoad(){
		let res = await Api.metroData()
		this.setData({
			data:res.data
		})
		list = res.data
		console.log(res,list)

		this.setData({
			ec:{
				onInit: this.initChart
			},
			pageShow:true
		})
	},
  	onReady() {}
});
