import COS from '../lib/cos-wx-sdk-v5';
import config from "./config.js";
const dataUrl = config.basePath;
var app = getApp();
let errorNum = 0;

const scope = {
  "scope.userInfo": '用户信息',
  "scope.userLocation": '地理位置',
  "scope.address": '通讯地址',
  "scope.invoiceTitle": '发票抬头',
  "scope.werun": '微信运动步数',
  "scope.record": '录音功能',
  "scope.writePhotosAlbum": '保存到相册',
  "scope.camera": '摄像头',
}


function request(url, data = {}, method = "GET", contentType = "application/json", needSession3 = true) {
  const app = getApp();
  const that = this;
  return new Promise(function (resolve, reject) {
    let header = {};
    if (needSession3) {
      header = {
        'Content-Type': contentType,
        'session3': app.globalData.session3 || wx.getStorageSync('session3')
      }
    } else {
      header = {
        'Content-Type': contentType,
      }
    }
    wx.request({
      url: dataUrl + url,
      data: data,
      method: method,
      header,
      success: function ({
        statusCode,
        data,
        errMsg
      }) {
        if (statusCode == 200) {
          var errcode = data.errcode;
          if (errcode === 9402) {
            wx.showToast({
              title: "黑名单用户禁止访问",
              icon: 'none'
            })
          }
          if (errcode === 9401) {
            console.log("request->url->success->9401", url)
            wx.showModal({
              title: '请登录小程序访问详细信息',
              success(res) {
                if (res.confirm) {
                  wx.redirectTo({
                    url: '/pages/login/login?relogin=true',
                  })
                } else if (res.cancel) {
                  wx.redirectTo({
                    url: '/pages/index/index',
                  })
                }
              }
            })
            reject({
              errcode
            })
          } else {
            errorNum = 0;
            resolve(data);
          }
        } else {
          reject({
            statusCode,
            data,
            errMsg
          })
        }
      },
      fail: function (err) {
        reject(err)
        console.log("failed")
      }
    })
  });
}

// login
function login() {
  const that = this;
  return new Promise(function (resolve, reject) {
    wx.login({
      success: ({
        code
      }) => {
        console.log('code', code);
        wx.request({
          url: dataUrl + '/api/user/login',
          data: {
            code: code
          },
          method: 'GET',
          success: res => {
            console.log('requesr.js->login', res);
            wx.setStorageSync("session3", res.data.bean.session3);
            console.log("session3", res.data.bean.session3)
            if (res.data.bean.user) {
              wx.setStorageSync("adminUserM", res.data.bean.user);
              wx.setStorageSync("userId", res.data.bean.user.id);
              resolve(res.data.bean.session3, res.data.bean.user);
            } else {
              resolve(res.data.bean.session3);
            }
          },
          fail: res => {
            reject(res);
          }
        })
      }
    })
  })
}

function getUserInfoFn() {
  const that = this;
  return new Promise(function (resolve, reject) {
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            lang: 'zh_CN',
            withCredentials: true,
            success: function (res) {
              let userInfo = res.userInfo;
              // let remind = res.userInfo.reject;
              // wx.setStorageSync('remind', remind);
              console.log('userInfo', userInfo)
              wx.setStorageSync('user', userInfo);
              let info = wx.getStorageSync("info")
              console.log(wx.getStorageSync("info"))
              request('/api/user/info/update', {
                ...userInfo
              }, 'POST').then(res => {
                console.log("update", res)
                wx.setStorageSync('adminUserM', res);
                // wx.setStorageSync("teamId", res.teamId);
                // console.log('teamId', res.teamId);
                resolve(userInfo);
              }).catch(res => {
                reject(res);
                console.log('更新用户信息失败', res)
              })
            },
            fail: function (err) {
              console.log('用户点了取消')
              reject(err);
            }
          })
        }
      }
    })
  });
}

function openSetting(type) {
  const that = this;
  return new Promise(function (resolve, reject) {
    wx.getSetting({
      success: (res) => {
        if (util.isEmpty(res.authSetting)) {
          console.log('授权为空')
          resolve();
        } else if (!res.authSetting[type]) {
          let title = scope[type];
          console.log('授权为false' + title)
          wx.showModal({
            title: "为了正常使用小程序",
            content: '需要授权' + title,
            success: (res) => {
              if (res.confirm) {
                wx.openSetting({
                  success: (res) => {
                    if (res.authSetting[type]) {
                      resolve();
                    } else {
                      reject();
                    }
                  }
                })
              } else {
                reject('click cancal')
              }
            },
            fail: (res) => {
              reject(res)
            }
          })
        } else {
          resolve();
        }
      },
      fail: function (res) {
        reject(res)
      }
    })
  })
}
//检查微信的checkSession3
function checkSession3() {
  return new Promise(function (resolve, reject) {
    wx.checkSession({
      success: function (res) {
        console.log("checkSession", res)
        resolve(true);
      },
      fail: function () {
        login().then(res => {
          resolve(true);
        }).catch(res => {
          reject(false)
        })
      }
    })
  })
}
module.exports = {
  login,
  request,
  getUserInfoFn,
  openSetting,
  checkSession3
}