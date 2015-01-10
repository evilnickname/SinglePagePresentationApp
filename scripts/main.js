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
        fullscreen.setup();
      },
      
      attachEventListeners = function () {
        /* slide navigation */
        document.getElementById('nextSlide').addEventListener('click', sppa.slides.next,false);
        document.getElementById('prevSlide').addEventListener('click', sppa.slides.prev,false);

        /* edit bar */
        document.getElementById('toggleInfoPane').addEventListener('click', sppa.main.toggleInfopane, false);
        document.getElementById('toggleEditMode').addEventListener('click', sppa.editmode.toggle, false);

        /* edit functions */
        sppa.editmode.attachEventListeners();
      },

      fullscreen = {
        setup : function () {
          if (fullscreen.supported()) {
            document.getElementById('toggleFullscreen').addEventListener('click', fullscreen.toggle, false);
            fullscreen.addFullscreenchangeEventListener(fullscreen.onFullscreenchange);
          } else {
            var btn = document.getElementById('toggleFullscreen');
            btn.parentNode.removeChild(btn);
            sppa.main.toggleFullscreen = function () {
              return false;
            };
          }
        },

        addFullscreenchangeEventListener : function (callback) {
          if (docElem.requestFullscreen) {
            document.addEventListener('fullscreenchange', callback, false)
          } else if (docElem.msRequestFullscreen) {
            document.addEventListener('MSFullscreenChange', callback, false)
          } else if (docElem.mozRequestFullScreen) {
            document.addEventListener('mozfullscreenchange', callback, false)
          } else if (docElem.webkitRequestFullScreen) {
            document.addEventListener('webkitfullscreenchange', callback, false)
          }
        },

        exitFullscreen : function () {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          }
        },

        fullscreenElement : function () {
          if (docElem.requestFullscreen) {
            return document.fullscreenElement();
          } else if (docElem.msRequestFullscreen) {
            return document.msFullscreenElement;
          } else if (docElem.mozRequestFullScreen) {
            return document.mozFullScreenElement;
          } else if (docElem.webkitRequestFullscreen) {
            return document.webkitFullscreenElement;
          } else {
            return null;
          }
        },

        isFullscreen : function () {
          return (fullscreen.fullscreenElement() && fullscreen.fullscreenElement() !== null) ? true : false;
        },

        onFullscreenchange : function () {
          if (!fullscreen.isFullscreen()) {
            docElem.classList.remove('isFullscreen');
          }
        },

        requestFullscreen : function () {
          if (docElem.requestFullscreen) {
            docElem.requestFullscreen();
          } else if (docElem.msRequestFullscreen) {
            docElem.msRequestFullscreen();
          } else if (docElem.mozRequestFullScreen) {
            docElem.mozRequestFullScreen();
          } else if (docElem.webkitRequestFullscreen) {
            docElem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
          }
        },

        supported : function () {
          return (docElem.requestFullscreen
                  || docElem.msRequestFullscreen
                  || docElem.mozRequestFullScreen
                  || docElem.webkitRequestFullscreen) ? true : false;
        },

        toggle: function () {
          if (!fullscreen.isFullscreen()) {
            fullscreen.requestFullscreen();
          } else {
            fullscreen.exitFullscreen();
          }
          sppa.main.toggleDocMode('isFullscreen');
        }
      },

      toggleInfopane = function () {
        sppa.main.toggleDocMode('showsInfopane');
      },

      toggleDocMode = function (docMode) {
        docElem.classList.toggle(docMode);
      }

  return {
    init: init,
    slideContainer: slideContainer,
    toggleInfopane: toggleInfopane,
    toggleFullscreen: fullscreen.toggle,
    toggleDocMode: toggleDocMode
  }
})();
