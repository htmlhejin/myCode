
import {
  request as R
} from "../../utils/request.js"

Page({
  data: {
    paper: {},
    view:1
  },

  viewPaper:function(e){
    let id = e.target.dataset.id
    let view = this.data.view
    wx.showLoading({
      title: '加载中',
    })
    R("/api/paper/paperAnswer", {
      paperId: id
    }).then(res=>{
      console.log(res)
      wx.setStorage({
        key: 'createPaperView',
        data: res.bean,
      })
      wx.hideLoading()
      wx.navigateTo({
        url: `/pages/question/question?view=${view}`,
      })
    })
    // wx.navigateTo({
    //   url: `/pages/question/question?view=${view}&id=${id}`,
    // })
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