import {
  request as R,
} from '../../utils/request.js'

Page({
  data: {
    paper: {},
  },
  // 开始答题
  response(event) {
    R("/api/paper/paperAnswer", {
      paperId: event.target.dataset.id
    }).then(res => {
      wx.navigateTo({
        url: `/pages/question/question?content=${JSON.stringify(res.bean.paper)}`,
      })
    })
  },

  onLoad: function (options) {
    let paper = this.data.paper
    this.setData({
      paper: JSON.parse(options.paper),
    })
  }
})