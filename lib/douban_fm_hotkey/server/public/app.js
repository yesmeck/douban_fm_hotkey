$(function() {

  var client = new Faye.Client('http://localhost:1988/faye');

  client.subscribe('/state', function(message) {
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
  });

  $buttons = $('button');
  $buttons.click(function() {
    $this = $(this);
    var cmd = $this.data('cmd')
    client.publish('/hotkey', { cmd: cmd });
  });
});
