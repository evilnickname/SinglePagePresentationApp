sppa.extend('sppa.storage');

sppa.storage = (function () {
  var supported = function () { 
        return (window.localStorage) ? true : false;
      },
      
      save = function (data, key) {
        window.localStorage[key] = data;
      };
  
  return {
    save: save,
    supported: supported
  }
})();