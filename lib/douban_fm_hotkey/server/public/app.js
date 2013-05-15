$(function() {
  if ($buttons = $('button')) {
    $buttons.click(function() {
      $this = $(this);
      var cmd = $this.data('cmd')
      $.get('http://localhost:1988/' + cmd);
    });
  }
});
