function moveElement(el, endPos, duration, startPos = 0) {
  var startTime = null;

  //функция которая будет вызываться на каждом кадре анимации
  function animate(time) {
    // если еще ни разу не вызывалась, сохраняем начаальное время
    if (startTime === null) {
      startTime = time;
    }
    // считаем, сколько времени прошло с начала
    var timeElapsed = time - startTime;
    // считаем долю времени от duration
    var progress = Math.min(timeElapsed / duration, 1);

    // двигаем элемент влево пропорционально progress
    el.style.left = startPos + progress * (endPos - startPos) + "px";

    // если время не закончилось, запускаем следующий кадр
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  // заупскаем первый кадр
  requestAnimationFrame(animate);
}
