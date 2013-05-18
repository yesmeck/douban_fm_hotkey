['faye', 'client'].forEach(function(script) {
  var el = document.createElement('script');
  el.src = 'http://localhost:1988/' + script + '.js';
  document.documentElement.firstChild.appendChild(el);
});

