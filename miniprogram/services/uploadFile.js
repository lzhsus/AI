// 上传文件
export const uploadFile = function(filePath,suffix,dir){
    return new Promise((resolve,reject)=>{
        var cloudPath = (dir||'manager_log') + '/manager_'+ new Date().getTime() + '.' + (suffix || 'png')
        wx.cloud.uploadFile({
            cloudPath: cloudPath,
            filePath: filePath,
            success:res => {
                resolve(Object.assign(res,{
                    success:true
                }))
            },
            fail: e => {
                resolve(Object.assign(res,{
                    success:false
                }))
            }
        })
    })
}