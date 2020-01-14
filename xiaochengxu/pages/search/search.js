let {
  commonPath
} = require('../../utils/util.js')

import {
  request as R,
} from '../../utils/request.js';

Page({
  data: {
    name: "",
    searchList: []
  },

  // 输入时
  bindinput: function(e) {
    R("/api/paper/nameLike", {
      name: e.detail.value,
    }).then(res => {
      let searchList = this.data.searchList
      this.setData({
        searchList : res.bean.content
      })
    })
  },

  // 搜索具体试卷
  bindtap:function(e){
    wx.navigateTo({
      url: `/pages/totalTimeStart/totalTimeStart?id=${e.currentTarget.dataset.id}`
    })
  },
  // 取消搜索
  cancel:function() {
    wx.navigateBack({
      delta: 1,
    })
  },
})