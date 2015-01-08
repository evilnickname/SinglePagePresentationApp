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
  var init = function () {
        sppa.keybindings.bind();
        sppa.editmode.init();
        document.documentElement.classList.remove('no-js');
      },
      
      fullscreenToggle = function () {
        /* https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode#Toggling_fullscreen_mode */
        if (!document.fullscreenElement &&    // alternative standard method
            !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
          } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
          } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
          } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
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
      },
      
      infopane = document.getElementById('infopane'),
      infopaneToggle = function () {
        infopane.classList.toggle('hidden');
      }

  return {
    fullscreenToggle: fullscreenToggle,
    init: init,
    infopane: infopane,
    infopaneToggle: infopaneToggle
  }
})();
