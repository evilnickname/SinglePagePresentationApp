sppa.extend('sppa.editmode');

sppa.editmode = (function () {
  var _editor = document.getElementById('editor'),
      _slide,
      
      attachEventListeners = function () {
        document.getElementById('insertAfter').addEventListener('click', insertSlideAfter, false);
        document.getElementById('insertBefore').addEventListener('click', insertSlideBefore, false);
        document.getElementById('deleteSlide').addEventListener('click', deleteSlide, false);
        document.getElementById('reset').addEventListener('click', sppa.storage.clear, false);
      },

      deleteSlide = function () {
        var refSlide = document.querySelector('.slide--active'),
            refSlideIndex = [].indexOf.call(sppa.main.slideContainer.children, refSlide);
        sppa.main.slideContainer.removeChild(refSlide);
        sppa.slides.goto(refSlideIndex > 1 ? refSlideIndex - 1 : 0);
        saveSlideDeck();
      },
      
      editorUpdate = function () {
        _editor.value = _slide.innerHTML;
      },

      insertSlideAfter = function () {
        var refSlide = document.querySelector('.slide--active');
        sppa.main.slideContainer.insertBefore(sppa.slides.createSlide(), refSlide.nextElementSibling);
        sppa.slides.next();
      },

      insertSlideBefore = function () {
        var refSlide = document.querySelector('.slide--active');
        sppa.main.slideContainer.insertBefore(sppa.slides.createSlide(), refSlide);
        sppa.slides.prev();
      },

      saveSlideDeck = function () {
        var slides =  document.querySelectorAll('.slide');
        window.localStorage.clear();
        for (var i = 0, n = slides.length; i < n; i++) {
          sppa.storage.save(slides[i].innerHTML, 'sppa-slide-' + i);
        }
        sppa.storage.save(slides.length, 'sppa-slide-length');
      },

      slideEditorBreakdown = function () {
        _editor.value = null;
        _editor.removeEventListener('input', slideUpdate);
        _editor.removeEventListener('blur', saveSlideDeck);
      },
  
      slideEditorSetup = function () {
        _slide = document.querySelector('.slide--active');
        _editor.addEventListener('input', slideUpdate, false);
        _editor.addEventListener('blur', saveSlideDeck, false);        
        _editor.addEventListener('focus', sppa.keybindings.unbind, false);
        _editor.addEventListener('blur', sppa.keybindings.bind, false);
        editorUpdate();
      },

      slideUpdate = function () {
        _slide.innerHTML = _editor.value;
      },
      
      swapEditor = function () {
        _slide = document.querySelector('.slide--active');
        editorUpdate();
      },
              
      toggle = function() {
        var docElem = document.documentElement;
        if (docElem.getAttribute('data-editmode')) {
          docElem.removeAttribute('data-editmode');
          slideEditorBreakdown();
        } else {
          docElem.setAttribute('data-editmode', true);
          slideEditorSetup();
        }
      }
  ;
  return {
    attachEventListeners: attachEventListeners,
    toggle: toggle,
    swapEditor: swapEditor
  };
})();
