$('.toolbar a').click(function(e) {
  var command = $(this).data('command');
  if (command == 'insertimage') {
    url = prompt('Enter the link here: ', 'http:\/\/');
    document.execCommand($(this).data('command'), false, url);
  } else document.execCommand($(this).data('command'), false, null);
});