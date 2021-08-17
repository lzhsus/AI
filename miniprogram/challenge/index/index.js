import * as echarts from '../../utils/echart/echarts';
const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
Page({
    data: {
        gradeList:[{grades:1},{grades:2},{grades:3}]
    },
    async onLoad (options) {
        await common.loadFontFaceInit('https://resources.17font.com/ziru/res/fonts/535877f.woff','My-foot')
        let gradeList = this.data.gradeList;
        gradeList = gradeList.map(item=>{
            item.curGrade = common.gradeImage(1)
            console.log(item.curGrade)
            return item;
        })
        this.setData({
            gradeList:gradeList
        })
    },
    onShow: function () {

    },
})