// pages/paperModel/paperModel.js

import {
  request as R,
} from '../../utils/request.js';
Page({

  data: {
    content: [],
  },
  // 点击某个试卷
  start(e) {
    R("/api/paper/paperAnswer", {
      paperId: e.target.dataset.id
    }).then(res => {
      wx.navigateTo({
        url: `/pages/paperModeStart/paperModeStart?paper=${JSON.stringify(res.bean.paper)}`
      })
    })
  },
  onLoad: function(options) {
    let content = this.data.content
    this.setData({
      content: JSON.parse(options.content)
    })
  },
})