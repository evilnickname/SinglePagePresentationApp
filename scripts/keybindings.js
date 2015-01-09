sppa.extend('sppa.keybindings');

sppa.keybindings = (function () {
  var bind = function () {
        document.documentElement.addEventListener('keyup', keyListener, false);
      },
      unbind = function () {
        document.documentElement.removeEventListener('keyup', keyListener);
      },
  
      keyListener = function (evt) {
//        console.log(evt.keyCode);
        evt.preventDefault();
        switch (evt.keyCode) {
          case 27: /* Esc */
            if (!sppa.main.infopane.classList.contains('infopane--offscreen')) {
              sppa.main.infopaneToggle();
            }
            break;
          case 33: /* PageUp */
          case 37: /* ArrowLeft */
          case 38: /* ArrowUp */
            sppa.slides.prev();
            break;
          case 32: /* Spacebar */
          case 34: /* PageDown */
          case 39: /* ArrowRight */
          case 40: /* ArrowDown */
            sppa.slides.next();
            break;
          case 36: /* Home */
            sppa.slides.goto(0);
            break;
          case 35: /* End */
            sppa.slides.goto(sppa.slides.lastSlideIndex);
            break;
          case 73: /* i */
            sppa.main.infopaneToggle();
            break;
          case 69: /* e */
            sppa.editmode.toggle();
            break;
          case 70: /* f */
            sppa.main.fullscreenToggle();
            break;
        }
      };
  
  return {
    bind: bind,
    unbind: unbind
  };
})();
