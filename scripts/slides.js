sppa.extend('sppa.slides');

sppa.slides = (function () {
  var _slides = document.getElementsByClassName('slide'),

      init = function () {
        loadSlideDeck();
      },

      clearSlideContainer = function () {
        while(sppa.main.slideContainer.firstChild) {
          sppa.main.slideContainer.removeChild(sppa.main.slideContainer.firstChild)
        }
      },

      createSlide = function (htmlString) {
        var slide = document.createElement('ARTICLE');
        slide.setAttribute('class', 'slide');
        if (htmlString) {
          slide.innerHTML = htmlString;
        }
        return slide;
      },

      getActiveSlideIndex = function () {
        var index;
        for (var i = 0, n = _slides.length; i < n; i++) {
          if (_slides[i].classList.contains('slide--active')) {
            index = i;
          }
        }
        return index;
      },

      goto = function (index) {
        var activeSlideIndex = getActiveSlideIndex();
        if ((index !== activeSlideIndex) && _slides[index]) {
          _slides[index].classList.add('slide--active');
          if (activeSlideIndex) {
            _slides[activeSlideIndex].classList.remove('slide--active');
          }
          sppa.editmode.swapEditor();
        }
      },

      loadSlideDeck = function () {
        var slideData = sppa.storage.retrieve('sppa');
        if (slideData) {
          var slides = JSON.parse(slideData),
              docFrag = document.createDocumentFragment();
          for (var key in slides) {
            if (slides.hasOwnProperty(key)) {
              var newSlide = createSlide(slides[key]);
              if (key === "0") {
                newSlide.classList.add('slide--active');
              }
              docFrag.appendChild(newSlide);
            }
          }
          clearSlideContainer();
          sppa.main.slideContainer.appendChild(docFrag);
        }
      },

      next = function () {
        var activeSlideIndex = getActiveSlideIndex();
        if (_slides[activeSlideIndex + 1]) {
          _slides[activeSlideIndex + 1].classList.add('slide--active');
          _slides[activeSlideIndex].classList.remove('slide--active');
          sppa.editmode.swapEditor();
        }
      },

      prev = function () {
        var activeSlideIndex = getActiveSlideIndex();
        if (_slides[activeSlideIndex - 1]) {
          _slides[activeSlideIndex - 1].classList.add('slide--active');
          _slides[activeSlideIndex].classList.remove('slide--active');
          sppa.editmode.swapEditor();
        }
      }
  ;

  return {
    activeSlide: getActiveSlideIndex,
    createSlide: createSlide,
    init: init,
    goto: goto,
    next: next,
    lastSlideIndex: _slides.length - 1,
    prev: prev
  };
})();
