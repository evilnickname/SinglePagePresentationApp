var sppa = {};

sppa.extend = function (namespaceAsString) {
  var namespaceAsArray = namespaceAsString.split("."),
      parent = window;

  for (var i = 0, l = namespaceAsArray.length; i < l; i++) {
    if (typeof parent[namespaceAsArray[i]] === 'undefined') {
      parent[namespaceAsArray[i]] = {};
    }
    parent = parent[namespaceAsArray[i]];
  }

  return parent;
};

sppa.extend('sppa.main');

sppa.main = (function () {
  var docElem = document.documentElement,
      slideContainer = document.getElementById('slides'),

      init = function () {
        sppa.slides.init();
        sppa.keybindings.bind();
        attachEventListeners();
      },
      
      attachEventListeners = function () {
        /* slide navigation */
        document.getElementById('nextSlide').addEventListener('click', sppa.slides.next,false);
        document.getElementById('prevSlide').addEventListener('click', sppa.slides.prev,false);

        /* edit bar */
        document.getElementById('toggleFullscreen').addEventListener('click', sppa.main.toggleFullscreen, false);
        document.getElementById('toggleInfoPane').addEventListener('click', sppa.main.toggleInfopane, false);
        document.getElementById('toggleEditMode').addEventListener('click', sppa.editmode.toggle, false);

        /* edit functions */
        sppa.editmode.attachEventListeners();

//        document.getElementById().addEventListener('click', ,false);


      },

      toggleInfopane = function () {
        sppa.main.toggleDocMode('infopane');
      },

      toggleFullscreen = function () {
        /* https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode#Toggling_fullscreen_mode */
        if (!document.fullscreenElement &&    // alternative standard method
            !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
          if (docElem.requestFullscreen) {
            docElem.requestFullscreen();
          } else if (docElem.msRequestFullscreen) {
            docElem.msRequestFullscreen();
          } else if (docElem.mozRequestFullScreen) {
            docElem.mozRequestFullScreen();
          } else if (docElem.webkitRequestFullscreen) {
            docElem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          }
        }
        sppa.main.toggleDocMode('fullscreen');
      },

      toggleDocMode = function (mode) {
        var docMode = 'data-' + mode;
        if (docElem.getAttribute(docMode)) {
          docElem.removeAttribute(docMode);
        } else {
          docElem.setAttribute(docMode, true);
        }
      }

  return {
    init: init,
    slideContainer: slideContainer,
    toggleInfopane: toggleInfopane,
    toggleFullscreen: toggleFullscreen,
    toggleDocMode: toggleDocMode
  }
})();
