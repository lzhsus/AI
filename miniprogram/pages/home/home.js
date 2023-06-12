
const Api = require('../../services2/api/index');
let interstitialAd = null
Page({
	data: {
		today:""
	},
	bindgetphonenumber(e){
		
	},
	async onLoad(options) {
		this.initAD()
	},
	initAD(){
		// 在页面中定义插屏广告
		// 在页面onLoad回调事件中创建插屏广告实例
		if (wx.createInterstitialAd) {
			interstitialAd = wx.createInterstitialAd({
				adUnitId: 'adunit-fe4704d84f0d7d7c'
			})
			interstitialAd.onLoad(() => {
				console.log('插屏 广告加载成功')
			})
			interstitialAd.onError((err) => {
				console.log('插屏 广告加载失败'+err)
			})
			interstitialAd.onClose(() => {
				console.log('插屏 广告关闭')
			})
		}

		// 在适合的场景显示插屏广告
		if (interstitialAd) {
			interstitialAd.show().catch((err) => {
				console.error(err)
			})
		}
	},
	openpage(){
		wx.showModal({
			content:"更多精彩，敬请期待",
			showCancel:false
		})
	},
	adLoad() {
		console.log('Banner 广告加载成功')
	},
	adError(err) {
		console.log('Banner 广告加载失败', err)
	},
	adClose() {
		console.log('Banner 广告关闭')
	},
})