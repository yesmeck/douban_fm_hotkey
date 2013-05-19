// ==UserScript==
// @name        Douban FM Hotkey
// @namespace   http://yesmeck.com
// @description Douban FM Hotkey
// @include     http://douban.fm/
// @version     1.2.0
// @grant       none
// ==/UserScript==

window.onload = function() {
  ['faye', 'client'].forEach(function(script) {
    var el = document.createElement('script');
    el.src = 'http://localhost:1988/' + script + '.js';
    document.documentElement.firstChild.appendChild(el);
  });
};

