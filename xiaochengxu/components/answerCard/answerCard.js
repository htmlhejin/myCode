// components/answerCard/answerCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    questionNum: 20,
    kucun: 1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    customMethod:function(showModal){
      let that = this;
      that.setData({
        showModal:false
      })
      console.log("showmodal",that.data.showModal)
    }
  }
})
