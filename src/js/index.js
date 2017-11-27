(function ($) {
  const customActions = [
    {
      name: 'alert',
      icon: 'fa-bolt',
      action: function() {
        alert("ALERT")
      }
    },
    {
      name: 'strikeThrough',
      icon: 'fa-strikethrough',
      action: function() {
        document.execCommand("strikeThrough", false, null)
      }
    }
  ];

  $('nav').on('click', 'a[data-command]', function (e) {
    let editor = $('#editor');
    setTimeout(function() {
      editor.focus();
    }, 0);
    let command = $(this).data('command');
    let flag = false;
    customActions.forEach((customAction) => {
      if (command === customAction.name) {
        customAction.action();
        flag = true;
      }
    });
    if (flag) {
      return;
    }
    switch (command) {
      case 'insertimageFile':
        $('#image-loader').click();
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
      case 'custom':
        createCustomActions();
        break;
      case 'importall':
        $('#content-loader').click();
        break;
      case 'exportall':
        exportJSON();
        break;
      default:
        document.execCommand(command, false, null);
    }
  });

  function createCustomActions() {
    customActions.forEach((customAction) => {
      let menuPanel = $(".toolbar");
      let name = customAction.name;
      let icon = customAction.icon;
      let button = `<li><a href='#' data-command='${name}'><i class='fa ${icon}'></i></a></li>`;
      menuPanel.append(button);
    });
  }

  $("input[type=file]").change(function () {
    let inp = $("input[type=file]");
    if (inp.val() === "") {
      return;
    }
    inp.val("");
  });

  window.previewFile = function() {
    let file    = document.querySelector('#image-loader').files[0];
    let reader  = new FileReader();
    reader.addEventListener("load", function () {
      document.execCommand('insertHTML', false, `<img src='${reader.result}'/>`);
      file.value = null;
    }, false);
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  function initPrint() {
    let mywindow = window.open('', 'PRINT', 'height=400,width=600');
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
    let tableStr = "<table class='custom-table'>";
    tableStr += "<thead><tr>";
    for (let i = 0; i < colsNumber; i++) {
      tableStr += "<th></th>";
    }
    tableStr += "</thead><tbody>";
    for (let i = 0; i < rowsNumber; i++) {
      tableStr += "<tr>";
      for (let j = 0; j < colsNumber; j++) {
        tableStr += "<td></td>"
      }
      tableStr += "</tr>";
    }
    tableStr += "</tbody>";
    tableStr += "</table>";
    return tableStr
  }

  window.importJson = function() {
    let file = document.querySelector('#content-loader').files[0];
    let reader = new FileReader();

    reader.addEventListener("load", function () {
      let jsonObject = JSON.parse(reader.result);
      $("#editor").html(jsonObject.data);
      file.value = null;
    }, false);
    if (file) {
      reader.readAsText(file);
    }
  };

  function exportJSON() {
    let blob, objJSON = {
      title: "web-document",
      data: $('#editor').html(),
    };

    blob = new Blob([JSON.stringify(objJSON)], {
      type: "application/json"
    });

    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveBlob(blob, "document.json");
    } else {
      let a = window.document.createElement("a");

      a.href = window.URL.createObjectURL(blob);
      a.download = "document.json";
      window.document.body.appendChild(a);
      a.click();
      window.document.body.removeChild(a);
    }
  }
})(jQuery);