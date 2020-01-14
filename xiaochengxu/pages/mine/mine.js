// pages/mine/mine.js

let {
  commonPath
} = require('../../utils/util.js')

import {
  request as R,
  login
} from "../../utils/request.js"

Page({

  data: {
    user: {}
  },

  iDonePaper: function() {
    R("/api/paper/haveDone").then(res=>{
      wx.setStorage({
        key: 'iDonePaper',
        data: res.bean.content,
      })
    })
    wx.navigateTo({
      url: `/pages/donePaper/donePaper`
    })
  },

  iCreatePaper: function() {
    R("/api/paper/created").then(res=>{
      wx.setStorage({
        key: 'iCreatePaper',
        data: res.bean.content,
      })
    })
    wx.navigateTo({
      url: '/pages/iCreatePaper/iCreatePaper',
    })
  },

  // 点击用户信息
  userinfo: function() {
    let id = this.data.user.id
    wx.navigateTo({
      url: `/pages/userinfo/userinfo?id=${id}`,
    })
  },

  adviceBack: function() {
    wx.navigateTo({
      url: '/pages/adviceBack/adviceBack'
    })
  },

  message:function(){
    wx.navigateTo({
      url: '/pages/message/message',
    })
  },

  connect: function() {
    wx.navigateTo({
      url: '/pages/connectKefu/connectKefu'
    })
  },

  about: function() {
    wx.navigateTo({
      url: '/pages/about/about'
    })
  },
  onLoad: function(options) {
    let that = this;
    let user = that.data.user
    wx.getStorage({
      key: 'adminUserM',
      success: function(res) {
        that.setData({
          user: res.data
        })
      }
    })
  },
  onShareAppMessage: function () {
  }
})