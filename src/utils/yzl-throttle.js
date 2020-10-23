export default function(delay, callback) {
  let _this = this;

  let timeoutID = null;

  let lastExtc = 0;

  function clearExistingTimeout() {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
  }

  return function() {
    let _arg = arguments;
    //  elapsed 离上次节流出发时间多久
    let elapsed = Date.now() - lastExtc;
    console.log("elapssed", elapsed);

    // 运行回调 并记录这次回调时间
    function exec() {
      lastExtc = Date.now();
      callback.apply(_this, _arg);
    }
    function clear() {
      timeoutID = undefined;
    }
    clearExistingTimeout();
    //  离上次节流事假运行时间，如果大于 delay 运行callback
    if (elapsed > delay) {
      //运行callback
      exec();
    } else {
      // 如果小于，则减去已经过去的时间，而剩下的时间就是将要等待的时间
      timeoutID = setTimeout(exec, delay - elapsed);
    }
  };
}
