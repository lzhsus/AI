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

			grid: {
				top:'0%',
				left: '0%',
				right: '0%',
				bottom: '6%',
			},
			xAxis: [
				{
					boundaryGap: false,
					data: ['300', '500', '600', '700', '800', '850'],
					axisLabel:{
						inside: false,    // 刻度标签是否朝内，默认朝外
						align: 'center',     // 文字水平对齐方式，默认自动（'left'，'center'，'right'）
					}
				}
			],
			dataZoom: [{ 
				type: 'inside',
				show: true,
				xAxisIndex: [0],
				start: 0,//滚动条的起始位置
				end: 100 //滚动条的截止位置（按比例分割你的柱状图x轴长度）
			}],
			yAxis: [
				{
					type: 'value',
					show:false
				}
			],
			series: [
				{
					type: 'line',
					lineStyle: {
						width: 0
					},
					showSymbol: false,
					areaStyle: {
						opacity: 1,
						color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
							// {offset: "0.000000", color: "#000000"},
							// {offset: "0.209091", color: "#7500EC"},
							// {offset: "0.309091", color: "#00A9FF"},
							// {offset: "0.363636", color: "#00FF92"},
							// {offset: "0.418182", color: "#5DFF00"},
							// {offset: "0.509091", color: "#FFFF00"},
							// {offset: "0.554545", color: "#FFAC00"},
							// {offset: "0.700000", color: "#FF0000"},
							// {offset: "0.872727", color: "#610000"},
							// {offset: "1.000000", color: "#000000"},
							{ offset: "0.000000", color: "#00A9FF" },
							{ offset: "0.125000", color: "#00FF92" },
							{ offset: "0.200000", color: "#5DFF00" },
							{ offset: "0.325000", color: "#FFFF00" },
							{ offset: "0.387500", color: "#FFAC00" },
							{ offset: "0.587500", color: "#FF0000" },
							{ offset: "0.825000", color: "#610000" },
							{ offset: "1.000000", color: "#000000" },
						])
					},
					data: [999, 999, 999, 999, 999, 999, 999]
				},
			]
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
