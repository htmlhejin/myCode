const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const testPhone = num => {
  var reg = /^1[3|4|5|7|8][0-9]{9}$/;
  if (reg.test(num)) {
    return true;
  }
  return false;
}

const idcard = num => {
  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (reg.test(num)) {
    return true;
  }
  return false;
}
const password = num => {
  var reg = /^.*(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[#$%^&*])\w{7,}/;
  if (reg.test(num)) {
    return true;
  }
  return false;
}

module.exports = {
  formatTime: formatTime,
  testPhone: testPhone,
  idcard: idcard,
  password: password
}
