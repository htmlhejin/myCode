import {
  request as R,
} from '../../utils/request.js'


Page({
  data: {
    paper: {},
    mername: "",

  },
  // 开始答题
  response(event) {
    let that = this
    wx.showLoading({
      title: '加载中',
    })
    R("/api/paper/paperAnswer", {
      paperId: event.target.dataset.id
    }).then(res => {
      let mold = res.bean.paper.mold
      if (mold == 1) {
        wx.setStorage({
          key: 'paperInfomation',
          data: res.bean,
        })
        wx.hideLoading()
        wx.navigateTo({
          url: '/pages/question/question',
        })
      } else if (mold == 2) {
        console.log(res)
        wx.showToast({
          title: '已经答过一次',
          icon:'warn',
          duration:1500
        })
        // wx.setStorage({
        //   key: 'paperInfomation',
        //   data: res.bean,
        // })
        // wx.hideLoading()
        // wx.navigateTo({
        //   url: '/pages/question/question',
        // })
      }
    })
  },
  xiangqing: function(id) {
    let that = this;
    let paper = that.data.paper
    let mername = that.data.mername;
    R("/api/paper/paper", {
      id: id,
    }).then(res => {
      console.log(res)
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
  }
})