(function() {

  var client = new Faye.Client('http://localhost:1988/faye');

  client.subscribe('/hotkey', function(msg) {
    var songInfo = getSongInfo();
    if (msg.cmd == 'info') {
      sendNotification(songInfo.song.coverUrl, songInfo.song.artistName, songInfo.song.songName);
    } else {
      window.DBR.act(msg.cmd);
      if (msg.cmd == 'pause' || msg.cmd == 'love') {
        publishSongInfo(songInfo);
        if (msg.cmd == 'love') {
          var img;
          if (window.DBR.selected_like()) {
            img = 'like.png'
          } else {
            img = 'unlike.png'
          }
          sendNotification('http://localhost:1988/' + img, songInfo.song.artistName, songInfo.song.songName);
        }
      }
    }
  });

  client.subscribe('/get_info', function() {
    publishSongInfo(getSongInfo());
  });

  var interval = window.setInterval(function() {
    if (window.extStatusHandler) {
      clearInterval(interval);
      var originExtStatusHandler = window.extStatusHandler;
      window.extStatusHandler = function(info) {
        var parsedInfo = $.parseJSON(info);
        if (parsedInfo.type == 'start') {
          var songInfo = {
            song: {
              artistName: parsedInfo.song.artist,
              channelName: getChannelName(parsedInfo.channel),
              coverUrl: parsedInfo.song.picture,
              songName: parsedInfo.song.title
            },
            radio: {
              is_paused: false,
              selected_like: parsedInfo.song.like
            }
          };
          publishSongInfo(songInfo);
          sendNotification(songInfo.song.coverUrl, songInfo.song.artistName, songInfo.song.songName);
        }
        originExtStatusHandler(info);
      };
    }
  }, 100);

  var getSongInfo = function() {
    return {
      song: window.FM.getCurrentSongInfo(),
      radio: {
        is_paused: window.DBR.is_paused(),
        selected_like: window.DBR.selected_like()
      }
    };
  };

  var sendNotification = function(image, title, content) {
    if (window.webkitNotifications.checkPermission() == 0) {
      var notification = window.webkitNotifications.createNotification(
        image, title, content
      );
      notification.onshow = function() {
        setTimeout(function() {
          notification.close()
        }, 5000);
      };
      notification.show();
    } else {
      window.webkitNotifications.requestPermission();
    }
  };

  var publishSongInfo = function(info) {
    client.publish('/info', info);
  };

  var getChannelName = function(id) {
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

})();
