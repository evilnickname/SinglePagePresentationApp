sppa.extend('sppa.keybindings');

sppa.keybindings = (function () {
  var bind = function () {
        document.documentElement.addEventListener('keypress', keyListener, false);
      },
      unbind = function () {
        document.documentElement.removeEventListener('keypress', keyListener);
      },
  
      keyListener = function (evt) {
    //    console.log(evt)

        switch (evt.charCode) {
          case 32: /* spacebar */
            sppa.navigation.next();
          case 63: /* ? */
          case 105: /* i */
            sppa.main.infopaneToggle();
            break;
          case 101: /* e */
            sppa.editmode.toggle();
            break;
          case 102: /* f */
            sppa.main.fullscreenToggle();
            break;
        }

        switch (evt.keyCode) {
          case 27: /* Esc */
            if (sppa.main.infopane.classList.contains('infopane--visible')) {
              sppa.main.infopaneToggle();
            }
            break;
          case 8: /* BackSpace */
            evt.preventDefault();
          case 33: /* PageUp */
          case 37: /* ArrowLeft */
          case 40: /* ArrowUp */
            sppa.navigation.prev();
            break;
          case 34: /* PageDown */
          case 39: /* ArrowRight */
          case 40: /* ArrowDown */
            sppa.navigation.next();
            break;
          case 36: /* Home */
            sppa.navigation.goto(0);
            break;
          case 35: /* End */
            sppa.navigation.goto(sppa.navigation.lastSlideIndex);
            break;
        }   
      };
  
  return {
    bind: bind,
    unbind: unbind
  };
})();