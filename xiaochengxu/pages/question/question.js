import {
  request as R,
} from '../../utils/request.js'

import {trans,countdown,countTime} from "../../utils/timer.js"

Page({
  data: {
    charList: [],
    questionTypes:[],
    paper: {},   
    questions: [],
    question: {},
    answers:[],
    currentQuestionAnswer: {
      questionId: null,
      type:"",
      list: []
    },
    page: 0,
    timer: 0,
    questionList:[],
    questionType:"",
    isSelected:false,
    uuid: "",
    showModal:false,
    questionNum: 1,
    onlyView:0,
    borderColor:"",
    backgroundColor:"",
    isDone:0
  },
  answerCard:function(){
    let that = this
    let showModal = that.data.showModal
    let questions = that.data.questions
    that.setData({
      showModal:!showModal
    })
    wx.getStorage({
      key: 'paperInfomation',
      success: function(res) {
        let questionLength = res.data.list.length
        that.setData({
          questionNum: questionLength
        })
      }
    })
    that.setData({
      questions: questions
    })
  },
  cancelModal:function(){
    let that = this
    let showModal = that.data.showModal
    that.setData({
      showModal: !showModal
    })
  },
  questionTypeJudge: function (item, index,question){
    let that = this;
    let questionType = that.data.questionType
    if (questionType == 1) {
      for (let i = 0; i < question.list.length; i++) {
        question.list[i].checked = false
      }
      that.setData({
        question: question
      })
      that.checked(item, index, question)
    } else {
      that.checked(item, index, question)
    }
  },
  checked: function (item, index, question){
    let that = this;
    let checked = `question.list[${index}].checked`;
    that.checkedPushAnswers(item, question, checked)
  },
  checkedPushAnswers: function (item, question, checked){
    let that = this;
    let answers = that.data.answers;
    let paper = that.data.paper;
    let questionList = that.data.questionList;
    let currentQuestionAnswer = that.data.currentQuestionAnswer;
    let id = question.question.id;
    let questionType = question.question.type;
    let score = question.question.score;
    if (!item.checked){
      if (questionType ==1 || questionType ==3) {
        for (let k = 0; k < question.list.length;k++){
          question.list[k].checked = false;
          that.setData({
            question: question
          })
        }
        if (!item.checked){
          that.setData({
            [checked]: true,
            isSelected:true
          })
        }
        let choice = {
          questionId: id,
          type: questionType,
          score: question.question.score,
          list: [{
            optionsId: Number(item.id),
            content: item.name || ""
          }]
        }
        that.setData({
          currentQuestionAnswer: choice,
          questionType: questionType
        })
        if (answers.length==0){
        } else{
          for (let i = 0; i < answers.length; i++) {
            if (answers[i].questionId == id){
              answers.splice(i,1)
            }
          }
        }
      } else if (questionType ==2){
        let choiceList = {
          optionsId: Number(item.id),
          content: item.name || ""
        }
        let choice = {
          questionId: id,
          type: questionType,
          score: score,
          list: that.data.questionList
        }
        that.setData({
          currentQuestionAnswer: choice,
          [checked]: true,
          isSelected:true,
          questionType:questionType
        })
        for (let i = 0; i < answers.length;i++){
          if(answers[i].questionId==id){
            answers[i].list.push(choiceList)
          }
        }
        that.data.questionList.push(choiceList)
      } 
    } 
    else {
      if(questionType==2){
        if (that.data.questionList.length >= 0 && answers.length>0){
          for (let i = 0; i < answers.length; i++) {
            if (answers[i].questionId == id) {
              for (let j = 0; j < answers[i].list.length; j++) {
                if (answers[i].list[j].optionsId == item.id) {
                  answers[i].list.splice(j, 1)
                  that.setData({
                    [checked]: false,
                    isSelected: false
                  })
                }
              }
            }
          }
        }
        else if (that.data.questionList.length >= 0 && answers.length == 0) {
          for (let i = 0; i < that.data.questionList.length;i++){
            if (that.data.questionList[i].optionsId == item.id){
              that.data.questionList.splice(i, 1)
            }
          }

          let choiceList = {
            optionsId: Number(item.id),
            content: item.name || ""
          }
          let choice = {
            questionId: id,
            type: questionType,
            score: score,
            list: that.data.questionList
          }
          that.setData({
            currentQuestionAnswer: choice,
            [checked]: false,
            isSelected: false,
            questionType: questionType
          })
        }
      } else if (questionType == 1 || questionType == 3){
        that.setData({
          isSelected: true,
          [checked]: true
        })
      }
    }
  },
  tapOption(e) {
    let that = this;
    let dataset = e.target.dataset;
    let index = dataset.index;
    let item = dataset.item;
    let paper = dataset.paper;
    let question = that.data.question;   
    let id = question.question.id;
    let checked = `question.list[${index}].checked`;
    that.questionTypeJudge(item,index,question,e);
  },
  pushAnswer: function () {
    let that=this;
    that.data.questionList=[];
    let answers = that.data.answers;
    let questions = that.data.questions;
    let currentQuestionAnswer = that.data.currentQuestionAnswer;
    let questionType = that.data.questionType;
    let has=false;
    for (let i = 0; i < answers.length;i++){
      if (answers[i].questionId == currentQuestionAnswer.questionId){
        if (questionType == 2){
          if (that.data.isSelected) {
            answers[i].list = answers[i].list.concat(that.data.questionList)
          }
        } else if (questionType == 1 || questionType == 3 || questionType == 4 || questionType == 5){
          answers[i] = currentQuestionAnswer
        }
        has=true;
      }
    }
    if (!has && currentQuestionAnswer.questionId != null && currentQuestionAnswer.list.length>0){
      answers.push(currentQuestionAnswer)
    }
    questions.map((question) => {
      answers.map(answer=>{
        if (answer.questionId == question.question.id){
          question.question.isDone = 1
        }
      })  
    })
    that.setData({
      questions
    })
  },
  nextQuestion: function(e) {
    this.pushAnswer()
    let page = this.data.page;
    page++;
    let questionSize = this.data.questions.length ;
    if (page >= questionSize){
    }else{
      this.setData({
        page
      })
    }
    this.everyQuestion(page)
  },
  prevQuestion: function(e) {
    this.pushAnswer()
    let that = this;
    let answers = that.data.answers
    that.setData({
      answers
    })
    let page = this.data.page;
    if (page <= 0){
      wx.showToast({
        title: '已经是第一题',
      })
    }else{
      page--
    }
    this.setData({
      page
    })
    this.everyQuestion(page)
  },
  inputAnswer:function(e){
    let that = this;
    let question = that.data.question;   
    let questionType = question.question.type
    let listArr = [];
    let choice = {
      questionId: that.data.question.question.id,
      score: question.question.score,
      type: questionType,
      list: listArr
    }
    for (let i = 0; i < that.data.question.list.length;i++){
      if (that.data.question.list[i].id == e.target.dataset.item.id){
        that.data.question.list[i].content = e.detail.value
      }
       let choiceList = {
          optionsId: Number(that.data.question.list[i].id),
         content: that.data.question.list[i].content
        }
      listArr.push(choiceList)
    }
    that.setData({
      currentQuestionAnswer: choice,
      questionType: that.data.question.question.questionType
    })
    if(choice != null){
      question.question.isDone = 1
    }else{
      question.question.isDone = 0
    }
    that.setData({
      question
    })
  },
  submit: function() {
    this.pushAnswer();
    let that = this;
    let questionsLength = that.data.questions.length;
    let questions = [];
    let answers = that.data.answers;
    R("/api/paper/gather", {
      paperId: that.data.paper.id || 1,
      paperName: that.data.paper.name,
      type: that.data.paper.type,
      uuid:that.data.uuid,
      list: answers,
    }, 'post').then(res => {
      wx.navigateTo({
        url: '/pages/submitPaperNoScore/submitPaperNoScore'
      })
    })
  },
  everyQuestion: function(page) {
    let question = this.data.question
    this.setData({
      question: this.data.questions[page],
    })
  },
  onShareAppMessage: function (res) {
    let id = res.target.dataset.id
    return {
      title: '转发给',
      path:`pages/totalTimeStart/totalTimeStart?id=${id}`,
      success: function (res) {
        console.log("转发成功:" + JSON.stringify(res));
        var shareTickets = res.shareTickets;
        console.log('onShareAppMessage->',shareTickets)
      },
      fail: function (res) {
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
  onLoad: function(options) {
    console.log('question->',options)
    let that = this;
    let onlyView = that.data.onlyView
    let id = options.id
    that.setData({
      onlyView: options.view
    })
    let timer = that.data.timer;
    let question = that.data.question;
    R("/api/question/type").then(res=>{
      that.setData({
        questionTypes:res
      })
    })
    R("/api/question/options").then(res => {
      that.setData({
        charList: res
      })
    })
    // 从创建的试卷跳转过来
    if (that.data.onlyView==1){
      wx.getStorage({
        key: 'createPaperView',
        success: function (res) {
          console.log('createPaperView->',res)
          let paperInfo = res.data
          that.setData({
            question: res,
            paper: paperInfo.paper,
            uuid: paperInfo.uuid,
            questions: paperInfo.list,
          })
          for (let i = 0; i < that.data.questions.length; i++) {
            that.data.questions[i].question.isDone = 0
          }
          let time = Number(that.data.paper.time) * 60
          countdown(that, time, timer)
          that.everyQuestion(0)
        },
        fail:function(err){
          console.log(err)
        }
      })
    }
    // 从正常开始答题跳转过来
    else if (options.time==1){
      wx.getStorage({
        key: 'paperInfomation',
        success: function (res) {
          console.log(res)
          let paperInfo = res.data
          that.setData({
            question: res,
            paper: paperInfo.paper,
            uuid: paperInfo.uuid,
            questions: paperInfo.list,
          })
          for (let i = 0; i < that.data.questions.length; i++) {
            that.data.questions[i].question.isDone = 0
          }
          let time = Number(that.data.paper.time) * 60
          countdown(that, time, timer)
          that.everyQuestion(0)
        },
      })
    }
  }
})