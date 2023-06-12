
const Api = require('../../services/api/index');
import * as common from '../../common/common';
// 在页面中定义激励视频广告
let videoAd = null
Page({
    data: {
		tel:"",
		mobile:""
    },

    onLoad(opt) {
		this.data.tel = opt.tel||"";
		this.setData({
			tel:this.data.tel,
			tel2:common.mobile_asterisk(this.data.tel)
		})
		this.initVideo()
    },
	initVideo(){
		// 在页面onLoad回调事件中创建激励视频广告实例
		if (wx.createRewardedVideoAd) {
			videoAd = wx.createRewardedVideoAd({
				adUnitId: 'adunit-974f818abcb6f177'
			})
			videoAd.onLoad(() => {})
			videoAd.onError((err) => {})
			videoAd.onClose((res) => {
				// 用户点击了【关闭广告】按钮
				if (res && res.isEnded) {
					// 正常播放结束，可以下发游戏奖励
					this.buttonClick()
				  } else {
					// 播放中途退出，不下发游戏奖励
				  }
			})
		}
	},
	openAS(){
		// 用户触发广告后，显示激励视频广告
		if (videoAd) {
			videoAd.show().catch(() => {
				// 失败重试
				videoAd.load()
				.then(() => videoAd.show())
				.catch(err => {
					console.log('激励视频 广告显示失败')
					this.buttonClick()
				})
			})
		}else{
			this.buttonClick()
		}
	},
    bindinput(e){
        let value = e.detail.value;
        this.setData({
            mobile:value
        })
    },
	bindconfirm(){
		
	},
	buttonClick(e){
		if( !this.data.tel ){
			wx.showToast({
			  title: '当前未分配手机号~',
			  icon:"none"
			})
			return
		}
		wx.showModal({
			content: '您将通过平台的虚拟号联系车主\n（虚拟号不能重拨,再次拨打务必重新扫码！）',
			cancelText:"不拨打",
			confirmText:"拨打",
			success :(res)=> {
				if (res.confirm) {
					wx.makePhoneCall({
						phoneNumber: this.data.tel //仅为示例，并非真实的电话号码
					})
				}
			}
		})
	}
})
