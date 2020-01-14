import {
  request as R,
} from '../../utils/request.js'


Page({

  data: {
    option1: 'white',
    option2: 'white',
    option3: 'white',
    option4: 'white',
    viewSingle: true,
    viewDouble: true,
    viewJudge: true,
    viewTiankong: true,
    viewJianda: true,
    bgc1: "white",
    bgc2: "white",
    question: {}, 
    list: [],
    answer: "", 
    paper: {},
    second: ""
  },
  bindtouchstart1() {
    this.setData({
        option1: "#FFECCC",
        option2: "white",
        option3: "white",
        option4: "white",
      },
      setTimeout(
        () => {
          this.setData({
            option1: "#FFCC73"
          })
        }
      )
    )
  },

  bindtouchstart2() {
    this.setData({
        option2: "#FFECCC",
        option4: "white",
        option3: "white",
        option1: "white",
      },
      setTimeout(
        () => {
          this.setData({
            option2: "#FFCC73"
          })
        }
      )
    )
  },

  bindtouchstart3() {
    this.setData({
        option3: "#FFECCC",
        option2: "white",
        option4: "white",
        option1: "white",
      },
      setTimeout(
        () => {
          this.setData({
            option3: "#FFCC73"
          })
        }
      )
    )
  },

  bindtouchstart4() {
    this.setData({
        option4: "#FFECCC",
        option2: "white",
        option3: "white",
        option1: "white",
      },
      setTimeout(
        () => {
          this.setData({
            option4: "#FFCC73"
          })
        }
      )
    )
  },
  // 选中时
  judge1() {
    this.setData({
      bgc1: "green",
      bgc2: "white"
    })
  },

  judge2() {
    this.setData({
      bgc2: "green",
      bgc1: "white"
    })
  },

  bindinput: function(e) {
    let answer = this.data.answer
    this.setData({
      answer: e.detail.value
    })
  },

  countdown: function(that) {
    var second = that.data.second
    if (second == 0) {
      that.setData({
        second: "Time Out..."
      });
      return;
    }
    var time = setTimeout(function() {
      that.setData({
        second: second - 1
      });
      that.countdown(that);
    }, 1000)
  },
  submit: function() {
    let optionsId;
    let content;
    let subList = this.data.list
    subList.forEach(item => {
        optionsId = item.id,
        content = item.content
    });
    // 调用接口传递数据
    R("/api/paper/gather", {
      paperId: this.data.paper.id, // 试卷id
      paperName: this.data.paper.name,
      elapsed: this.data.paper.elapsed,
      createData:"",
      list: [{
        questionId: this.data.question.id, // 问题id
        type: this.data.question.score,
        score:this.data.question.score,
        list:[
          {
            optionsId: optionsId,
            content: optionsId
          }
        ]
      }]
    }, 'post').then(res => {
      console.log(res)
      // wx.navigateTo({
      //   url: '/pages/submitPaperNoScore/submitPaperNoScore'
      // })
    })
  },
  tijiao: function() {
    wx.showToast({
      title: '确认提交已答试题吗',
      duration: 2000,
      mask: true,
    })
  },
  reqponseStart:function(id){
    let that = this
    let paper = that.data.paper
    R("/api/paper/paperAnswer", {
      paperId: id
    }).then(res => {
      this.setData({
        paper:res.bean.content
      })
    })
  },

  onLoad: function(options) {
    this.reqponseStart(options.id)
    let that=this;
    that.countdown(that)
  },
})