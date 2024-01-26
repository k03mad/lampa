"use strict";

(function () {
  var main = function main() {
    var ITEMS_HIDE_SELECTORS = ['.open--premium', '.open--feed', '.open--settings', '.open--profile'];
    var ITEM_REWRITE_SELECTORS = ['.head__split'];
    ITEMS_HIDE_SELECTORS.forEach(function (item) {
      return $(item).hide();
    });
    ITEM_REWRITE_SELECTORS.forEach(function (item) {
      document.querySelector(item).style.width = 0;
      document.querySelector(item).style.margin = '0 0.7em';
    });
  };
  if (window.appready) {
    main();
  } else {
    Lampa.Listener.follow('app', function (event) {
      if (event.type === 'ready') {
        main();
      }
    });
  }
})();