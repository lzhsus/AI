
const Api = require('../../services3/api/index');
import * as common from '../../common/common';
const TsFoodClass = require("../../data-json/ts-food-class").default;
let interstitialAd = null;
Page({
	data: {
		active:0,
		list:TsFoodClass.data||[],
		isShow:false
	},
	onChange(e){
		if( !this.data.isShow ){
			this.setData({
				isShow:true
			})
			interstitialAd.show().catch((err) => {
				console.log(err)
			})
		}
	},
	openEntranceClick(e){
		let { item } = e.currentTarget.dataset;
		wx.navigateTo({
		  url: '/ts/index/index?cfg_key='+item.cfg_key,
		})
		console.log(e)
	},
	async onLoad(options) {

		this.initAD()
	},
	getData(){
		Api.aliyuncsData({method:"GET"}).then(res=>{
			this.setData({
				list:res.list||[]
			})
			common.LS.put("water-data",res.list||[],1)
			console.log(res)
		})
	},
	initAD(){
		// 在页面中定义插屏广告
		// 在页面onLoad回调事件中创建插屏广告实例
		if (wx.createInterstitialAd) {
			interstitialAd = wx.createInterstitialAd({
				adUnitId: 'adunit-ce6bf83e5e2ef07e'
			})
			interstitialAd.onLoad(() => {
				console.log('插屏 广告加载成功-ce6bf83e5e2ef07e')
			})
			interstitialAd.onError((err) => {
				console.log('插屏 广告加载失败'+err)
			})
			interstitialAd.onClose(() => {
				console.log('插屏 广告关闭')
			})
		}
	},
})