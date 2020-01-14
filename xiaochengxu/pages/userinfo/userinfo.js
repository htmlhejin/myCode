import {
  request as R,
} from "../../utils/request.js"

Page({
  data: {
    userinfo: {}
  },

  userinfo:function(id){
    let that = this;
    R("/api/user/userInfo",{
      id
    }).then(res=>{
      that.setData({
        userinfo:res.bean
      })
    })
  },

  onLoad: function(options) {
    this.userinfo(options.id)
  }
})