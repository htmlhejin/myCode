import {request as R} from "../../utils/request.js"

Page({

  data: {
    content:[],
    ifCreatePaper:false,
    ifPermission: false
  },

  create:function(){
    let that = this
    let content = that.data.content
    let session3 = wx.getStorageSync('session3')
    if(session3){
      wx.getStorage({
        key: 'iCreatePaper',
        success: function (res) {
          if(res.data.length!=0){
            that.setData({
              ifPermission: true,
              ifCreatePaper: true,
              content: res.data
            })
          }else{
            that.setData({
              ifPermission: true,
              ifCreatePaper: false,
              content: res.data
            })
          }
        },
        fail:function(){
          that.setData({
            ifPermission: true,
            ifCreatePaper: false,
          })
        }
      })
    }else{
      that.setData({
        ifPermission: false,
      })
    }
  },
  createPaper:function(e){
    let id = e.currentTarget.dataset.item.id
    wx.navigateTo({
      url: `/pages/createPaperView/createPaperView?id=${id}`
    })
  },
  onLoad: function (options) {
    this.create()
  }, 
})