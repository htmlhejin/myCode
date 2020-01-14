import {
  request as R
} from "../../utils/request.js"

Page({

  data: {
    content: "",
    imagesrc: "",
    images:[],
    phone: "",
    current:0,
    max:200
  },
  inputAnswer: function(e) {
    let value = e.detail.value;
    let length = parseInt(value.length);
    this.setData({
      content: value,
      current:length
    })
  },
  phone: function(e) {
    let phone = this.data.phone
    this.setData({
      phone: e.detail.value
    })
  },
  uploadImg: function(e) {
    let that = this;
    let images = that.data.images
    wx.chooseImage({
      count: 4, 
      sizeType: '62464B' ,   
      sourceType: ['album', 'camera'], 
      success: function(res) {
        let img = res.tempFilePaths[0]  
        that.data.images.push(res.tempFilePaths[0])
        that.setData({
          images
        })
      }
    })
  },
  submitAdvice: function(e) {
    R("/api/feedback/save", {
      image: this.data.images[0],
      content: this.data.content,
      phone: this.data.phone,
    }, 'post').then(res => {
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 2000,
        mask: true
      })
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/mine/mine',
        })
      }, 2000)

    })
  },


})