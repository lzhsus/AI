
const Api = require('../../services/api/index');
Page({
    data: {
		tel:"",
    },

    onLoad(opt) {
		this.data.tel = opt.tel||"";
		this.setData({
			tel:this.data.tel
		})
    },
	buttonClick(e){
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
