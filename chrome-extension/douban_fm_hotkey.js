var faye = document.createElement('script');
faye.src = 'http://localhost:1988/faye.js';
faye.onload = function() {
  exec(init);
}
document.documentElement.firstChild.appendChild(faye);

var init = function() {
  window.dfhClient = new Faye.Client('http://localhost:1988/faye');

  dfhClient.subscribe('/hotkey', function(message) {
    DBR.act(message.cmd)
    if (message.cmd == 'pause' || message.cmd == 'love') {
      dfhSendSongInfo({
        song: FM.getCurrentSongInfo(),
        radio: {
          is_paused: DBR.is_paused(),
          selected_like: DBR.selected_like()
        }
      });
    }
  });

  dfhClient.subscribe('/get_state', function() {
    dfhSendSongInfo({
      song: FM.getCurrentSongInfo(),
      radio: {
        is_paused: DBR.is_paused(),
        selected_like: DBR.selected_like()
      }
    });
  });

  window.dfhSendSongInfo = function(info) {
    dfhClient.publish('/state', info);
  };

  var channelName = function(id) {
    id = parseInt(id, 10);
    if (id === 0 || id === -9) {
      return "私人兆赫"
    } else {
      if (id === -3 || id === -8) {
        return "红心兆赫"
      } else {
        return $("#fm-channel-list .channel[cid=" + id + "] .chl_name").first().text()
      }
    }
  }

  setTimeout(function() {
    window.originExtStatusHandler = window.extStatusHandler;
    window.extStatusHandler = function(info) {
      var parsedInfo = $.parseJSON(info);
      if (parsedInfo.type == 'start') {
        dfhSendSongInfo({
          song: {
            artistName: parsedInfo.song.artist,
            channelName: channelName(parsedInfo.channel),
            coverUrl: parsedInfo.song.picture,
            songName: parsedInfo.song.title
          },
          radio: {
            is_paused: false,
            selected_like: parsedInfo.song.like
          }
        });
      }
      originExtStatusHandler(info);
    };
  }, 2000 );

};


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
  // document.documentElement.removeChild(script); // clean up
}

