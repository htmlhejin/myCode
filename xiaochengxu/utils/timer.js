let trans = function(val) {
  if (val < 10) {
    val = "0" + val;
  }
  return val;
}

let countTime = function(that ,time, timer) {
  var h = parseInt(time / 60 / 60),
  m = parseInt(time / 60 % 60),
  s = parseInt(time % 60);
  h = trans(h);
  m = trans(m);
  s = trans(s);
  let transTime = h + ":" + m + ":" + s
  that.setData({
    timer: transTime
  })
}
let countdown = function(that, time, timer) {
  var timer1;
  timer1 = setInterval(function() {
    timer = time--
      if (time <= 0) {
        clearInterval(timer1)
      }
    countTime(that ,time, timer)
  }, 1000)
}

module.exports = {
  trans,
  countTime,
  countdown
}