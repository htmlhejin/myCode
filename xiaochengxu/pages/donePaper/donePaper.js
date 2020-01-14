import {
  request as R
} from "../../utils/request.js"

Page({

  data: {
    paper: [],
  },
  onLoad: function(options) {
    this.donePaper()
  },
  donePaper:function(){
    let that = this
    let paper = that.data.content
    let session3 = wx.getStorageSync('session3')
    if (session3){
      wx.getStorage({
        key: 'iDonePaper',
        success: function (res) {
          that.setData({
            paper: res.data
          })
        },
      })
    }
  },
  paperView: function(e) {
    let id = e.currentTarget.dataset.item.id
    wx.navigateTo({
      url: `/pages/donePaperView/donePaperView?id=${id}`
    })
  },
})