var app = getApp();
// var cityInfo = require('../../utils/cityInfo.js');
// var cityItems = cityInfo.cityItems;

Page({
  data: {
    country:[],
    value:'',
    status:0
  },

  onLoad(options) {
   //console.log(options.num)
   if(options.num==3){
     this.setData({
       status:options.num
     })
   } else if(options.num == 4){
      this.setData({
        status: options.num
      })
   } else if (options.num == 5){
     this.setData({
       status: options.num
     })
   }
    var that = this;
    var strName = that.data.value
    var status =that.data.status
    //console.log(status)
    wx.request({
      url: 'http://192.168.55.239:7001/wechat_offer/get_destination',
      data: {
        status: status,
        strName: strName
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
       // console.log(res)
        var country = that.data.country  
        that.setData({
          country:res.data.data
        })
        //console.log(that.data.country)
      },
    })
  },
  bindChangeCity: function (e) {
    //console.log(e)
    var city = e.currentTarget.dataset.name//获取页面数据信息
    var country = e.currentTarget.dataset.country
    if(this.data.status==0){
      var arr = wx.getStorageSync("test2") || [];
      arr.unshift(city);
      wx.setStorageSync("test2", arr)
    }
    if (this.data.status == 5){
      var arr1 = wx.getStorageSync("test3") || [];
      //console.log(arr1)
      arr1.push({country, city});
      wx.setStorageSync("test3", arr1)
    }
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    var status = this.data.status
    if (status == 3) {
      prevPage.setData({
        startCity: city      //给上级页面的变量赋值
      })        
    } else if (status == 4){
      prevPage.setData({
        endCity: city      //给上级页面的变量赋值
      }) 
    }
    
    wx.navigateBack()  //返回上级页面
  },

  // 模糊查询
  mohuSer: function (event) {
    var that = this;
    
    var value = that.data.value
    that.setData({
      value: event.detail.value
    })
  },
  gotoSer: function () {
    var that = this;
    //console.log(that.data.value)
    var strName = that.data.value
    var status = that.data.status
    wx.request({
      url: 'http://192.168.55.239:7001/wechat_offer/get_destination',
      data: {
        status: status,
        strName: strName
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // console.log(res)
        var country = that.data.country
        that.setData({
          country: res.data.data
        })
        //console.log(that.data.country)
      },
    })
  }

 

})