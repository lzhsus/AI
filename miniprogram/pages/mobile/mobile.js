
const Api = require('../../services/api/index');
import * as common from '../../common/common';
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
