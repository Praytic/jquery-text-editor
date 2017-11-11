(function ($) {
  $('.toolbar a').click(function (e) {
    var command = $(this).data('command');
    if (command === 'insertimage') {
      url = prompt('Enter the link here: ', '');
      document.execCommand(command, false, url);
    }
    else if (command === 'insertTable') {
      const rowsNumber = $('#rows-number').val();
      const colsNumber = $('#cols-number').val();
      var tableStr = "<table class='custom-table'>";
      tableStr += "<thead><tr>";
      for (var i = 0; i < colsNumber; i++) {
        tableStr += "<th></th>";
      }
      tableStr += "</thead><tbody>";
      for (var i = 0; i < rowsNumber; i++) {
        tableStr += "<tr>";
        for (var j = 0; j < colsNumber; j++) {
          tableStr += "<td></td>"
        }
        tableStr += "</tr>";
      }
      tableStr += "</tbody>";
      tableStr += "</table>";

      document.execCommand("insertHTML", false, tableStr);
    }
    else {
      document.execCommand(command, false, null);
    }
  });
})(jQuery);