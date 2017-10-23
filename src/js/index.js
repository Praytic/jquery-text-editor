$('.toolbar a').click(function(e) {
  var command = $(this).data('command');
  if (command == 'insertimage') {
    url = prompt('Enter the link here: ', '');
    document.execCommand($(this).data('command'), false, url);
  } else document.execCommand($(this).data('command'), false, null);
});

$('.menu-option h1').click(function(e) {

});