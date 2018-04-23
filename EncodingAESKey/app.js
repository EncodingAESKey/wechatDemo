//app.js
App({
    globalData:{
        deviceInfo:{},
        postMessage:{}
    },
    onLaunch: function() {
        try {
            var localInfo = wx.getStorageSync('deviceInfo')
            if (!localInfo) {
                var res = wx.getSystemInfoSync(); //获取设备信息
                wx.setStorageSync('deviceInfo',res);
                // console.log("getDeviceInfo",res);
                this.globalData.deviceInfo = res;
            }else{
                this.globalData.deviceInfo = localInfo;
            }
        } catch(e) {

        }
    },
})
