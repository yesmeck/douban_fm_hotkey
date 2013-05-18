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
      var songInfo = {
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
      };
      dfhSendSongInfo(songInfo);
      // notice(songInfo);
    }
    originExtStatusHandler(info);
  };
}, 2000 );

var notice = function(songInfo) {
  if (window.webkitNotifications.checkPermission() == 0) {
    var notification = window.webkitNotifications.createNotification(
      songInfo.song.coverUrl, songInfo.song.artistName, songInfo.song.songName
    );
    notification.ondisplay = function() {
      setTimeout(notification.close(), 3000);
    };
    console.log(notification);
    console.log(notification.show);
    notification.show();
  } else {
    window.webkitNotifications.requestPermission();
  }
};
