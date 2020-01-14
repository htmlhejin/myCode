
import {
  request as R
} from "../../utils/request.js"

Page({
  data: {
    paper: {},
    view:1
  },

  viewPaper:function(e){
    let view = this.data.view
    wx.navigateTo({
      url: `/pages/question/question?view=${view}`,
    })
  },

  xiangqing: function (id) {
    let that = this;
    let paper = that.data.paper
    let mername = that.data.mername;
    R("/api/paper/paper", {
      id: id,
    }).then(res => {
      that.setData({
        paper: res.bean
      })
      if (that.data.paper.type == 1) {
        that.setData({
          mername: "总计时模式",
        })
      } else if (that.data.paper.type == 2) {
        that.setData({
          mername: "单独计时模式",
        })
      } else if (that.data.paper.type == 3) {
        that.setData({
          mername: "问卷模式",
        })
      }
      wx.setNavigationBarTitle({
        title: that.data.mername,
      })
    })
  },
  onLoad: function(options) {
    this.xiangqing(options.id)
  },
})