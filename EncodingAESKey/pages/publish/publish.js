const app = getApp(),
    deviceInfo = app.globalData.deviceInfo
Page({
    data:{
        address:'请选择您的当前位置~',  //位置
        items: [
            {name: '发布需求', value: 'receive_demand',checked: 'true'},
            {name: '寻求项目', value: 'dispatch_demand'},
        ],
        type:'receive_demand',  //发布 查找
        latitude:'',
        longitude:'',
        message:"",  //说明信息
        contact:"",  //联系人
        errorImg:'../../resources/errorImg.png',
        success:false,
        postMessageLocal:[],  //localstorage数据存储
    },
    //初始化
    onLoad:function() {
        console.log("publish");
    },
    //当前位置
    getMyPosition:function() {
        //打开地图选择位置
        wx.chooseLocation({
            success:this.handleGetMyPosition.bind(this)
        });
    },
    handleGetMyPosition:function(res) {
        this.setData({
            address:res.address,
            latitude:res.latitude,
            longitude:res.longitude
        });
    },
    //单选
    radioTypeChange:function(e) {
        // console.log("e",e.detail.value);
        this.setData({type:e.detail.value});
    },
    //说明
    explainMessageChange:function(e) {
        this.setData({message:e.detail.value})
    },
    //联系方式
    contactChange:function(e) {
        this.setData({contact:e.detail.value})
    },
    //发布信息
    handlePostMessage:function() {
        var checkOut = '';
        if (this.data.address == "请选择您的当前位置~") {
            checkOut = "请选择您的位置!";
		}else if (!this.data.message) {
            checkOut = "请填写说明信息!";
		}else if (!this.data.contact) {
            checkOut = "请填写联系信息!";
		}
        if(checkOut){
            wx.showToast({title:checkOut,image:this.data.errorImg,mask:true});
            checkOut == '';
            this.setData({
                success:false,
            })
			return;
        }
        // 请求数据
        this.sendAddItemRequset();
    },
    sendAddItemRequset:function() {
        this.setData({ //发布成功的状态
            success:true,
        })
        var postMessage = {
            address:this.data.address,
            type:this.data.type,
            latitude:this.data.latitude,
            longitude:this.data.longitude,
            message:this.data.message,
            contact:this.data.contact,
        }
        //模拟后台 发布存储localStorage
        try {
            // var value = wx.getStorageSync("postMessage");
            // console.log("value",JSON.parse(value));

            // value.forEach((item,index)=>{
            //     this.data.postMessageLocal.push(item);
            // })

            //先取出来上一次的
            var getPostMessage = wx.getStorageSync("postMessage");
            console.log("getPostMessage",getPostMessage);
            getPostMessage.forEach((item,index)=>{
                this.data.postMessageLocal.push(item);
            })
            //上一次的和现在新的合并
            this.data.postMessageLocal.push(postMessage);
            wx.setStorageSync("postMessage",this.data.postMessageLocal);
            //存储在本地
            var postData = wx.getStorageSync("postMessage");
            console.log("postData",postData);

        } catch (e) { }

        return;
        wx.request({
            url: 'request合法域名',
            method: 'POST', //GET
            data: {
                address:this.data.address,
                type:this.data.type,
                latitude:this.data.latitude,
                longitude:this.data.longitude,
                message:this.data.message,
                contact:this.data.contact,
            },
            header: {
                'content-type': 'application/json' //默认值  application/x-www-form-urlencoded
            },
            success: function(res) {
                console.log("request",res)
            }
        })
    },
})
