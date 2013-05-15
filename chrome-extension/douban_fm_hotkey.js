var faye = document.createElement('script');
faye.src = 'http://localhost:1988/faye.js';
faye.onload = function() {
  exec(control);
}
document.documentElement.firstChild.appendChild(faye);

var control = function() {
  var client = new Faye.Client('http://localhost:1988/faye');
  client.subscribe('/hotkey', function(message) {
    console.log(message);
    DBR.swf().act(message.cmd)

    client.publish('/state', {
      song: FM.getCurrentSongInfo(),
      radio: {
        is_paused: DBR.is_paused(),
        selected_like: DBR.selected_like()
      }
    });

  });
}

// http://stackoverflow.com/a/9906932/398988
function exec(fn) {
  var args = '';
  if (arguments.length > 1) {
    for (var i = 1, end = arguments.length - 2; i <= end; i++) {
      args += typeof arguments[i]=='function' ? arguments[i] : JSON.stringify(arguments[i]) + ', ';
    }
    args += typeof arguments[i]=='function' ? arguments[arguments.length - 1] : JSON.stringify(arguments[arguments.length - 1]);
  }
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = '(' + fn + ')(' + args + ');';
  document.documentElement.appendChild(script); // run the script
  document.documentElement.removeChild(script); // clean up
}

