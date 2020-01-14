import {
  request as R,
} from '../../utils/request.js';
Page({
  data: {
    question: [],
    mername: ""
  },
  // 点击某个试卷
  paperContent: function(e) {
    wx.navigateTo({
      url: `/pages/totalTimeStart/totalTimeStart?id=${e.currentTarget.dataset.id}`
    })
  },

  totalTimeMode: function(type) {
    let that = this;
    R("/api/paper/type", {
      type: type
    }).then(res => {
      this.setData({
        question: res.bean.content
      })
      for (let i = 0; i < this.data.question.length; i++) {
        let item = this.data.question[i]
        if (item.type == 1) {
          this.setData({
            mername: "总计时模式"
          })
        } else if (item.type == 2) {
          this.setData({
            mername: "单独计时模式"
          })
        } else {
          this.setData({
            mername: "问卷模式"
          })
        }
      }
      wx.setNavigationBarTitle({
        title: this.data.mername,
      })
    })
  },
  onLoad: function(options) {
    let question = this.data.question
    this.totalTimeMode(options.type)
  }
})