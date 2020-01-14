const app = getApp();

import {
  request as R,
  getUserInfoFn,
  login,
} from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.page = options.page;
    const session3 = wx.getStorageSync('session3');
    if (!session3 || options.relogin) {
      wx.showLoading({
        title: '登录中',
      })
      login().then((res, user) => {
        wx.hideLoading();
        this.redirect();
      }).catch(res => {
        wx.hideLoading();
        wx.showToast({
          title: '登录失败，请重新打开！',
          icon: 'none'
        })
      })
    } else {
      this.redirect();
    }

  },
  getUserInfo: function (e) {
    var that = this;
    if (e.detail.errMsg === 'getUserInfo:ok') {
      getUserInfoFn().then(res => {
        wx.showToast({
          title: '登录成功',
          success: function () {
            that.redirect();
          }
        })

      }).catch(res => {
        wx.showToast({
          title: '更新用户信息失败',
          icon: 'none'
        })
      });
    } else {
      wx.showModal({
        title: '提示',
        content: '请登录小程序',
        showCancel: false,
      });
    }
  },
  redirect: function () {
    const userInfo = wx.getStorageSync('adminUserM');
    var page = app.globalData.page;
    console.log("page", page)
    if (userInfo.language) {
      if (page != '/pages/login/login') {
        wx.switchTab({
          url: page,
        })
      } else {
        wx.switchTab({
          url: '/pages/index/index',
        })
      }
    }
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})