//index.js
//获取应用实例
var app = getApp();
import Dialog from '../../dist/dialog/dialog';

Page({
  data: {
    startCity: '上海',
    endCity: '北京',
    activeNames: ['1'],
    ml:8,
    history: [],
    history1:[],
    history2:[],
    history3:[],
    day:'',
    evening:'',
    re :0,
    message:0
  },
  onLoad:function(){
    
  },
  onShow:function(options){
    var that = this;
    var endCity = that.data.endCity;
    this.setData({
      endCity:endCity
    })
    var history = that.data.history
    var msg = wx.getStorageSync("test1")
    that.setData({
      history: msg
    })
    var history1 = that.data.history1
    var msg = wx.getStorageSync("test2")
    that.setData({
      history1: msg
    })
    var history2 = that.data.history2
    var msg = wx.getStorageSync("test3")
    that.setData({
      history2: msg
    })
    var history3 = that.data.history3
    var msg = wx.getStorageSync("test4")
    that.setData({
      history3: msg
    })
  },
  // 出发日期
  bindDateChange(e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      cf_date: e.detail.value
    })
  },
  goGnLogs() {
    var num = 5
    wx.navigateTo({
      url: "../logs/logs?num=" + num
    })
  },
  goLogs(){
    var num = 0 
    wx.navigateTo({
      url:"../logs/logs?num="+num
    })
  },
  goSelect() {
    wx.navigateTo({
      url: "../select/select"
    })
  },
  // 删除机票端 
  delInput:function(e){
    var that = this;
    var ind = e.target.dataset.index
    var history = that.data.history
    var arr = wx.getStorageSync("test1");
    arr.splice(ind, 1)
    that.setData({
      history: arr
    })
    wx.setStorageSync('test1', that.data.history)
    that.onShow()
  },
  // 删除签证 
  delInput1: function (e) {
    var that = this;
    var ind = e.target.dataset.index
    var history = that.data.history1
    //console.log(history)
    var arr = wx.getStorageSync("test2");
    arr.splice(ind, 1)
    //console.log(arr)
    that.setData({
      history1:arr
    })
    console.log(that.data.history1)
    wx.setStorageSync('test2', that.data.history1)
    that.onShow()
  },
  // 删除地接 
  delInput2: function (e) {
    var that = this;
    var ind = e.target.dataset.index
    var history2 = that.data.history2
    var arr = wx.getStorageSync("test3");
    arr.splice(ind, 1)
    that.setData({
      history2: arr
    })
    wx.setStorageSync('test3', that.data.history2)

    var arr1 = wx.getStorageSync('test4')
    arr1.splice(ind, 1)
    that.setData({
      history3: arr1
    })
    wx.setStorageSync('test4', that.data.history3)
    that.onShow()
  },
 onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },
  
  getT:function(e){
    var val = e.detail.value
    var day = this.data.day
    this.setData({
      day :val
    })
   // console.log(this.data.day)
  },
  getW: function (e) {
    var val = e.detail.value
    var evening = this.data.evening
    this.setData({
      evening: val
    })
    //console.log(this.data.evening)
    var day = this.data.day
    var evening = this.data.evening
    var arr = wx.getStorageSync("test4") || [];
    arr.push({day,evening})
    wx.setStorageSync('test4', arr)
  },
  getRs:function(e){
    var val = e.detail.value
    var re = this.data.re
    this.setData({
      re: val
    })
  },
  getMl:function(e){
    var val = e.detail.value
    var ml = this.data.ml
    this.setData({
      ml : val
    })
  },
  showPrice() {
    var that = this;
    var re = that.data.re
    var ml = that.data.ml
    var qz = wx.getStorageSync('test2')
    var test1 = wx.getStorageSync('test1')
    var jpd = JSON.stringify(test1)
    wx.request({
      url: 'http://192.168.55.239:7001/wechat_offer/get_offer',
      data: {
        visaCountry:qz,
        tickets:jpd,
        peopleNum:re,
        rate:ml
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //console.log(res)
        var message = that.data.message
        that.setData({
          message:res.data.data
        })
        if(res.data.code==0){
          Dialog.alert({
            title: '参考价',
            message: that.data.message
          }).then(() => {
             wx.clearStorage()
          })
        }else if(res.data.code==500){
          Dialog.alert({
            title: res.data.msg,
          }).then(() => {
            wx.clearStorage()
          })
        }

       
      }
    })
  
   
  },
 
})