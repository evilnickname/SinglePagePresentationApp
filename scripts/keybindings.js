sppa.extend('sppa.keybindings');

sppa.keybindings = (function () {
  var docElem = document.documentElement,

      bind = function () {
        docElem.addEventListener('keyup', keyListener, false);
      },
      unbind = function () {
        docElem.removeEventListener('keyup', keyListener);
      },
  
      keyListener = function (evt) {
        evt.preventDefault();
        switch (evt.keyCode) {
          case 27: /* Esc */
            if (docElem.classList.contains('showsInfopane')) {
              sppa.main.toggleInfopane();
            } else if (docElem.classList.contains('inEditmode')) {
              sppa.editmode.toggle();
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
            sppa.slides.goto(document.getElementsByClassName('slide').length - 1);
            break;
          case 73: /* i */
            sppa.main.toggleInfopane();
            break;
          case 69: /* e */
            sppa.editmode.toggle();
            break;
          case 70: /* f */
            sppa.main.toggleFullscreen();
            break;
        }
      };
  
  return {
    bind: bind,
    unbind: unbind
  };
})();
