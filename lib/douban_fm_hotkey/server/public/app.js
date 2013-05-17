$(function() {

  var client = new Faye.Client('/faye');

  client.subscribe('/state', function(message) {
    console.log(message);
    $pause_button = $('button.pause');
    $love_button = $('button.love');
    if (message.radio.is_paused) {
      $pause_button.text('播放');
    } else {
      $pause_button.text('暂停');
    }
    if (message.radio.selected_like) {
      $love_button.text('取消喜欢');
    } else {
      $love_button.text('喜欢');
    }
    $('#cover').html('<img src="' + message.song.coverUrl + '" />');
    $('#channel').html('频道: ' + message.song.channelName);
    $('#artist').html('歌手: ' + message.song.artistName);
    $('#song-name').html('歌名: ' + message.song.songName);
  });

  client.publish('/get_state', {ping: 1});

  $buttons = $('button');
  $buttons.click(function() {
    $this = $(this);
    var cmd = $this.data('cmd')
    client.publish('/hotkey', { cmd: cmd });
  });
});
