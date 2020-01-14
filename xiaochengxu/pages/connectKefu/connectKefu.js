Page({
  data:{
    bgcQQ:'#fff',
    fontColorQQ: '#F49C03',
    bgcWX: '#fff',
    fontColorWX: '#F49C03'
  },
  copy: function (e) {
    let index = e.target.dataset.index
    if (index==1){
      this.setData({
        bgcQQ: '#F49C03',
        fontColorQQ: '#fff'
      })
      wx.setClipboardData({
        data: '1552279266'
      })
    } else if (index ==2){
      this.setData({
        bgcWX: '#F49C03',
        fontColorWX: '#fff'
      })
      wx.setClipboardData({
        data: '1552279266'
      })
    }
  }
})