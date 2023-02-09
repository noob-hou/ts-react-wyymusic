function throttle(fn: (...arg: any[]) => any, interval = 300) {
  let lock = false;
  return function (this: unknown, ...args: any[]) {
    if (lock) return;
    lock = true;
    setTimeout(() => (lock = false), interval);
    fn.bind(this)(...args);
  };
}
export default throttle;
