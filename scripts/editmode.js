sppa.extend('sppa.editmode');

sppa.editmode = (function () {
  var _editor = document.getElementById('editor'),
      _slide,
      
      init = function () {
        document.getElementById('toggleEditMode').addEventListener('click', sppa.editmode.toggle, false);      
      },
  
      createSlide = function () {
        var slide = document.createElement('ARTICLE');
        slide.setAttribute('class', 'slide');
        document.getElementById('slides').appendChild(slide);
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
  
      saveSlideDeck = function () {
        var slides =  document.querySelectorAll('.slide'),
            slideArray = [];
        for (var i = 0, n = slides.length; i < n; i++) {
          slideArray.push(slides[i].innerHTML);
        }
        sppa.storage.save(slideArray, 'sppa');
      },  
      
      swapEditor = function () {
        _slide = document.querySelector('.slide--active');
        editorUpdate();
      },
      
      editorUpdate = function () {
        _editor.value = _slide.innerHTML;
      },
      
      slideUpdate = function () {
        _slide.innerHTML = _editor.value;
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
    init: init,
    toggle: toggle,
    swapEditor: swapEditor
  };
})();