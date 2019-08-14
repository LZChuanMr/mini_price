// pages/select/select.js
var app = getApp();
var utils = require("../../utils/util.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    startCity: '出发地',
    endCity: '目的地',
    array:[],
    index:0 ,
    start:"",
    stop:'',
    calendarShow:false
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function () {

  },
  select({detail:{begin:{text:begin},over:{text:over}}}){
    //console.log(begin,over);
    this.setData({
      start:begin,
      stop:over
    })
    this.offCalendar();
  },
  openCalendar(){
    this.setData({calendarShow:true});
  },
  offCalendar() {
    this.setData({ calendarShow: false });
  },
  getCp:function(e){
    var that = this;
    var startCity = that.data.startCity
    //console.log(startCity)
    var endCity = that.data.endCity
    //console.log(endCity)
    wx.request({
      url: 'http://192.168.55.239:7001/wechat_offer/get_ticket',
      data: {
        starCity: startCity,
        endCity: endCity
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //console.log(res.data.data)
        var array = that.data.array
        that.setData({
          array: res.data.data
        })
       // console.log(that.data.array)
      },
    })
  },
  bindPickerChange(e){
   var that =this
    //console.log('picker下拉项发生变化后，下标为：', e.detail.value)
    that.setData({
      index: e.detail.value
    })
    //console.log('picker下拉项发生变化后，携带的值为：', this.data.array[e.detail.value])
    that.value = that.data.array[e.detail.value]
  },
  goGnLogs() {
    var num = 3
    wx.navigateTo({
      url: "../logs/logs?num="+num
    })
  },
  goGwLogs() {
    var num = 4
    wx.navigateTo({
      url: "../logs/logs?num=" + num
    })
  },
 
  /**
   * 产品选择确认
   */
  dateFormSubmit(e) {
    var that = this;
    //获取产品data
    let arr = wx.getStorageSync("test1") || [];
    //console.log(that.value.productName)
    var productName = that.value.productName
    var price = that.value.price
    arr.unshift({productName,price});
    wx.setStorageSync("test1", arr)   
    wx.navigateBack()  //返回上级页面
  },
  
  /**
   * 产品选择取消
   */
  dateFormReset(e) {
    this.setData({
      showDateChooseStatus: false,
      beginDateNoSubmit: {},
      endDateNoSubmit: {},
      textareaDisabled: false,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  }
})