import * as common from '../../common/common';

Component({
    properties: {
        pageTitle:{
            type:String,
            default:"index"
        }
    },
    options: {
        addGlobalClass: true,
    },
    data: {

    },
    methods: {
        changeTabClick(e){
            let { page } = e.currentTarget.dataset;
            if(common.getCurrentPage()===page) return;
            wx.redirectTo({ url: page })
        }
    }
})