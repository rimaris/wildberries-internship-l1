function getCallStackSize() {
  var i = 0;
  // вызываем функцию внутри самой себя и каждый раз увеличиваем счетчик
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
