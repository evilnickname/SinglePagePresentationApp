# Single Page Presentation App

Single page, plain vanilla javascript presentation app.

Features:
- Fullscreen slides (uses the HTML5 Fullscreen API);
- Add, remove and edit slides;
- Changes stored in localStorage.

Tested in Firefox, Chrome & Safari on OSX, and IE11 on Win7.
Should work in IE10 as well.
Could work—without fullscreen support—in IE9 if I added -ms-transforms and a classlist polyfill.

Possible bonus sprinkles on top:
- (per slide) (live) style editing. (WIP in separate branch.)
- Import and export slides.
- Gruntify/Bowerify/SASSify/Minimizeify/Opimizify/And-the-likeify.

Known issue:
- When going fullscreen in Chrome and Opera, the current slide isn't scaling properly. Seems to be related to position:fixed on .slide.