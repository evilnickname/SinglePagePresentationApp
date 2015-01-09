sppa.extend('sppa.storage');

sppa.storage = (function () {
  var supported = function () {
        return (window.localStorage) ? true : false;
      },

      clear = function () {
        if (window.confirm('Are you sure you want to reset this presentation?')) {
          window.localStorage.clear();
          window.location.reload(true);
        }
      },

      retrieve = function (key) {
        return window.localStorage.getItem(key);
      }
      save = function (data, key) {
        window.localStorage.setItem(key, data);
      };

  return {
    clear: clear,
    save: save,
    supported: supported,
    retrieve: retrieve
  }
})();
