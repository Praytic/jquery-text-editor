(function ($) {
  $('a[data-command]').click(function (e) {
    var command = $(this).data('command');
    if (command === 'insertimageLocal') {
      $('input[type=file]').click();
    }
    else if (command === 'insertimage') {
      url = prompt('Enter the link here: ', '');
      document.execCommand(command, false, url);
    }
    else if (command === 'insertTable') {
      document.execCommand("insertHTML", false, createTable());
    }
    else {
      document.execCommand(command, false, null);
    }
  });

  $("input[type=file]").change(function () {
    var inp = $("input[type=file]");
    if (this.val() === "") {
      return;
    }
    inp.val("");
  });

  window.previewFile = function() {
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();
    reader.addEventListener("load", function () {
      document.execCommand('insertHTML', false,
          "<img src='" + reader.result + "'/>");
      file.value = null;
    }, false);
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  function createTable() {
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
    return tableStr
  }
})(jQuery);