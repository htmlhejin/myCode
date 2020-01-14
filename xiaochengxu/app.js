import {
  login,
  request as R,
  checkSession3,
  openSetting,
  getUserInfoFn
} from "./utils/request.js";
import config from "./utils/config.js";
import util from "./utils/util.js";
const recorderManager = wx.getRecorderManager();
App({
  data: {
    imgBaseUrl: config.imgBaseUrl,
    basePath: config.basePath,
  },
  globalData: {
    isLogin: false,
    userInfo: null,
    session3: null,
    checkCard: false,
  },

  onLaunch: function (e) {
    const that = this;
    const user = wx.getStorageSync('user');
    this.globalData.page = this.processSharePage(e);
  },
  processSharePage: function (e) {
    var path = "/" + e.path;
    var query = e.query;
    if (query) {
      path = path +
        Object.keys(query).map(function (k) {
          return "?" + encodeURIComponent(k) + '=' + encodeURIComponent(query[k])
        }).join('&');
    }
    return encodeURI(path);
  },
  // 异步下载
  downLoad: function (url) {
    const that = this;
    return new Promise(function (resolve, reject) {
      wx.downloadFile({
        url: url,
        header: {
          session3: wx.getStorageSync('session3')
        },
        success: function (res) {
          if (res.statusCode === 200) {
            resolve(res.tempFilePath);
          }
        },
        fail: function (res) {
          console.log('downLoadFail')
          reject(res)
        }
      })
    })
  }
})