//index.js
//获取全局应用实例
const app = getApp(),
    deviceInfo = app.globalData.deviceInfo
Page({
    data: {
        test: '',
        latitude:'',
        longitude:'',
        controls: [{ //中心点
            id: 1,
            iconPath: '/resources/pin.png',
            position: {  //获取宽高
                left: deviceInfo.windowWidth / 2 - 12,
                top: (deviceInfo.windowHeight-45) / 2 - 30,
                width: 24,
                height: 30
            },
        },{ //回到中心点
            id: 2,
            iconPath: '/resources/center.png',
            position: {  //获取宽高
                left: 20,
                top: (deviceInfo.windowHeight - 90),
                width: 30,
                height: 30
            },
            clickable: true
        }],
        markers:[], //标记点
    },
    onReady: function (e) {
        // 使用 wx.createMapContext 获取 map 上下文
        this.mapCtx = wx.createMapContext('myMap')
    },
    onShow:function() {
        //获取经纬度
        wx.getLocation({
            type: 'gcj02',
            success:this.handleGetLocation.bind(this)
        })
        var results = [];
        // console.log("show",wx.getStorageSync("postMessage"));
        var showMarkers = wx.getStorageSync("postMessage");
        showMarkers.forEach((item,index)=>{
            results.push({
                iconPath:"/resources/"+item.type+".png",
                id:item.id,
                latitude:item.latitude,
                longitude:item.longitude,
                width: 30,
                height: 30
            })
        })
        this.setData({
            markers:results
        })
        return;
        //获取后台有多少个标记点
        wx.request({
            url: 'request合法域名', //获取标记点的接口地址
            method:'GET',
            data: {},
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function(res) {
                //获取坐标点
                console.log('res',res);
                return;
                var markers = res.data.data;
                var results = [];
                markers.forEach((item,index)=>{
                    results.push({
                        iconPath:"/resources/"+item.type+".png",
                        id:item.id,
                        latitude:item.latitude,
                        longitude:item.longitude,
                        width: 50,
                        height: 50
                    })
                })
                this.setData({
                    markers:results
                })
            }
        })
    },
    //获取经纬度
    handleGetLocation:function(res) {
        console.log("getLocation",res);
        this.setData({
            latitude : res.latitude,
            longitude : res.longitude
        })
    },
    //初始化
    onLoad:function(options) {
        // console.log("onload");
    },
    //转发
    onShareAppMessage:function() {
        return {
            title: 'IT外包云平台,可发布您的需求，也可接项目来一展你的才华',
            path: '/pages/index/index',
            success: function(res) {},
            fail: function(res) {}
        }
    },
    //地图中心移动到当前定位点
    controltap:function(e) {
        var id = e.controlId  //判断id为2时
        if(id === 2){
            this.mapCtx.moveToLocation() //移动到当前坐标点
        }
    },
    bindtapEvent(){

        console.log("ksdfjalkfdl")
    },
    //点击标记点时触发
    bindmarkertap:function(e) {
        console.log(e);
        this.data.markers.forEach((item,index)=>{
            if(e.markerId === item.id){
                wx.showModal({
                    title:item.type,
                    content:item.message+','+item.contact+','+item.address,
                    showCancel:false
                })
            }
        })
    }
})
