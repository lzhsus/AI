import * as common from '../../common/common';
const TsFoodList = require("../../data-json/ts-food-list").default;
console.log(TsFoodList)
Page({
	data: {
		list:TsFoodList.data||[],
		cfg_key: 0,

		adInfo:{},
		code:['4d6163767073fef3','58bdc224ac7e1526','9069ad5605a57ec7',"ac77c97a1762b529"]
	},
	onLoad(opt) {
		this.setData({
			cfg_key: opt.cfg_key || 0
		})
		this.loadAD()
	},
	onShow() {

	},
	onChange(){
		let index = ~~(Math.random()*this.data.code.length);
		let code = this.data.code[index]
		let ad = this.data.adInfo['video_'+code];
		
		this.showAS(ad)
	},
	loadAD(code){
		for(let i=0;i<this.data.code.length;i++){
			var videoAd = null;
			if (wx.createRewardedVideoAd) {
				videoAd = wx.createRewardedVideoAd({
					adUnitId: 'adunit-'+this.data.code[i]
				})
				videoAd.onLoad(() => {})
				videoAd.onError((err) => {})
				videoAd.onClose((res) => {
					// 用户点击了【关闭广告】按钮
					if (res && res.isEnded) {
						// 正常播放结束，可以下发游戏奖励
						
					} else {
						// 播放中途退出，不下发游戏奖励
					}
				})
			}
			this.data.adInfo['video_'+this.data.code[i]] = videoAd;
		}
		this.setData({
			adInfo:this.data.adInfo
		})
	},
	showAS(ad){
		ad.show().catch(() => {
			// 失败重试
			ad.load()
			.then(() => ad.show())
			.catch(err => {
				console.log('激励视频 广告显示失败')
			})
		})
	}
})
