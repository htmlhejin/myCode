// const app = getApp()
import {
  basePath
} from '../../utils/config.js';
import {
  request as R,
} from '../../utils/request.js';


Page({
  data: {
    paper: [],
    leftPaper:[],
    rightPaper:[],
    name: "",
    search: false,
    list:true,
    yingyong:false,
    background:[
      {url: "https://ae01.alicdn.com/kf/Uee05264873d64c6ea73352780fb8e21aO.png",id:0},
      {url: "https://ae01.alicdn.com/kf/Uee05264873d64c6ea73352780fb8e21aO.png",id:1},
      {url: "https://ae01.alicdn.com/kf/Uee05264873d64c6ea73352780fb8e21aO.png",id:2}
    ]
  },
  serach: function() {
    wx.navigateTo({
      url: `/pages/search/search`
    })
  },
  change: function () {
    let list=this.data.list
    let yingyong = this.data.yingyong
    this.setData({
      list:!list,
      yingyong:!yingyong
    })
  },
  everyQuestion(e) {
    wx.navigateTo({
      url: `/pages/totalTimeStart/totalTimeStart?id=${e.currentTarget.dataset.id}`
    })
    
  },
  totalTimeMode: function() {
    wx.navigateTo({
      url: `/pages/totalTimeMode/totalTimeMode?type=1`,
    })
  },
  singleTimeMode: function() {
    wx.navigateTo({
      url: `/pages/totalTimeMode/totalTimeMode?type=2`,
    })
  },
  questionMode: function () {
    wx.navigateTo({
      url: `/pages/totalTimeMode/totalTimeMode?type=3`,
    })
  },
  recommendQuestion:function(){
    let that = this;
    let leftPaper = that.data.leftPaper
    let rightPaper = that.data.rightPaper
    let paper = that.data.paper
    R("/api/paper/number", {
    }).then(res => {
      let length = res.bean.length
      that.setData({
        paper: res.bean
      })
      that.data.paper.map((item,index)=>{
        if (index < length/2){
          that.data.leftPaper.push(that.data.paper[index])
        } else if (index >= length / 2 && index<length){
          that.data.rightPaper.push(that.data.paper[index])
        }
      })
      that.setData({
        leftPaper, rightPaper
      })
    })
  },
  onLoad:function(options){
    this.recommendQuestion()
  },
  onShareAppMessage:function(){
  }
})