(function ($) {
  $('a[data-command]').click(function (e) {
    var editor = $('#editor');
    setTimeout(function() {
      editor.focus();
    }, 0);
    var command = $(this).data('command');
    switch (command) {
      case 'insertimageFile':
        $('input[type=file]').click();
        break;
      case 'insertimage':
        url = prompt('Enter the link here: ', '');
        if (url) {
          document.execCommand(command, false, url);
        }
        break;
      case 'insertTable':
        document.execCommand("insertHTML", false, createTable());
        break;
      case 'print':
        initPrint();
        break;
      default:
        document.execCommand(command, false, null);
    }
  });

  $("input[type=file]").change(function () {
    var inp = $("input[type=file]");
    if (inp.val() === "") {
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

  function initPrint() {
    var mywindow = window.open('', 'PRINT', 'height=400,width=600');
    mywindow.document.write('<html><head>');
    mywindow.document.write('</head><body >');
    mywindow.document.write(document.getElementById('editor').innerHTML);
    mywindow.document.write('</body></html>');
    mywindow.document.close();
    mywindow.focus();
    mywindow.print();
    mywindow.close();
  }

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