sppa.extend('sppa.slides');

sppa.navigation = (function () {
  var _slides = document.getElementsByClassName('slide'),
      init = function () {
        setActiveSlide();
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
      },
      goto = function (index) {
        var activeSlideIndex = getActiveSlideIndex();
        if ((index !== activeSlideIndex) && _slides[index]) {
          _slides[index].classList.add('slide--active');
          _slides[activeSlideIndex].classList.remove('slide--active');
          sppa.editmode.swapEditor();
        }
      }
  ;
    
  return {
    goto: goto,
    next: next,
    lastSlideIndex: _slides.length - 1,
    prev: prev
  };
})();