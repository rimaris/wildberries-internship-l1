function getCallStackSize() {
  var i = 0;
  function func() {
    i++;
    func();
  }

  try {
    func();
  } catch (e) {
    console.error(e);
    return i;
  }
}
