function moveElement(el, endPos, duration, startPos=0) {
  var startTime = null;

  function animate(time) {
    if (startTime === null) {
      startTime = time;
    }
    var timeElapsed = time - startTime;
    var progress = Math.min(timeElapsed / duration, 1);

    el.style.left = startPos + progress * (endPos - startPos) + "px";

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}
