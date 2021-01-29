import ls from "../services/cz-storage";

export const LS = ls;
export const isIOS = function(){
	const res = wx.getSystemInfoSync();
	return res.system.toLowerCase().indexOf("ios")!=-1&&res.platform.indexOf("devtools")==-1
}

export const getNewTime = function () {
    var date =  new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {
        month = '0' + month
    }
    if (day < 10) {
        day = '0' + day
    }
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    //这样写显示时间在1~9会挤占空间；所以要在1~9的数字前补零;
    if (hour < 10) {
        hour = '0' + hour;
    }
    if (minute < 10) {
        minute = '0' + minute;
    }
    if (second < 10) {
        second = '0' + second;
    }
    
    return hour + ':' + minute + ':' + second;
}
export const formatSeconds = function (value,language) {
    let secondTime = Number(value) //将传入的秒的值转化为Number
    let min = 0 // 初始化分
    let h = 0 // 初始化小时
    let d = 0 //初始化天
    let result = ''
    if (secondTime >= 60) { //如果秒数大于60，将秒数转换成整数
        min = Number(secondTime / 60) //获取分钟，除以60取整数，得到整数分钟
        secondTime = Number(secondTime % 60) //获取秒数，秒数取佘，得到整数秒数
        if (min >= 60) { //如果分钟大于60，将分钟转换成小时
            h = Number(min / 60) //获取小时，获取分钟除以60，得到整数小时
            min = Number(min % 60) //获取小时后取佘的分，获取分钟除以60取佘的分
            if (h >= 24) {
                d = Number(h / 24)
                h = Number(h % 24)
            }
        }
    }
    if(language=='zh'){
        if(h) {
            result = parseInt(h) + '小时' + parseInt(min)+'分'+parseInt(secondTime)+'秒'
        } else if(min) {
            result = parseInt(min)+'分'+parseInt(secondTime)+'秒'
        }else{
            result = parseInt(secondTime)+'秒'
        }
    }else{
        
        if(h) {
            result = parseInt(h)<10?'0'+parseInt(h):parseInt(h) + ':' + parseInt(min)<10?'0'+parseInt(min):parseInt(min)+':'+parseInt(secondTime)<10?'0'+parseInt(secondTime):parseInt(secondTime)
        } else if(min) {
            result = (parseInt(min)<10?'0'+parseInt(min):parseInt(min))+':'+(parseInt(secondTime)<10?'0'+parseInt(secondTime):parseInt(secondTime))
        }else{
            result = parseInt(secondTime)<10?'0'+parseInt(secondTime):parseInt(secondTime)
        }
    }
    return result;
}
