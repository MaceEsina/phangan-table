(function() {
  'use strict';

  var TR_EVEN_CLASS = 'even-row';

  var headers = ['Название услуги', 'Контакты', 'Описание, цены, ссылки'];
  var spreadsheetId = '1ozmzzK503RbPPEmiIddd9SFcxHuXTF21fVUxV3nLWJQ';
  var url = 'https://spreadsheets.google.com/feeds/list/' + spreadsheetId + '/1/public/values?alt=json';
  var xhr = new XMLHttpRequest();

  xhr.open('GET', url);
  xhr.responseType = 'json';
  xhr.send();

  xhr.onload = function() {
    document.getElementById("table").appendChild(createTable(xhr.response));
  }

  function createTable(jsonObj) {
    var table = document.createElement("table");

    createTableHead(table);
    createTableBody(table, jsonObj.feed.entry);

    return table;
  }

  function createTableHead(table) {
    var head = table.createTHead();
    var tr = head.insertRow();
    var i, th;

    for (i = 0; i < headers.length; i++) {
      th = document.createElement('th');
      th.innerHTML = headers[i];
      tr.appendChild(th);
    }
  }

  function createTableBody(table, rowArray) {
    var body = document.createElement('tbody');
    var i, tr, isEven = false;

    table.appendChild(body);

    for (i = 0; i < rowArray.length; i++) {
      tr = body.insertRow();
      isEven && tr.classList.add(TR_EVEN_CLASS);
      createTableRow(tr, rowArray[i]);
      isEven = !isEven;
    }
  }

  function createTableRow(tr, data) {
    tr.insertCell().innerHTML = retainLineBreaks(data.gsx$названиеуслуги.$t);
    tr.insertCell().innerHTML = retainLineBreaks(data.gsx$имя.$t + '\n' + data.gsx$контакты.$t);
    tr.insertCell().innerHTML = retainLineBreaks(data.gsx$описаниеценыссылки.$t);
  }

  function retainLineBreaks(str) {
    return str.replace(/(?:\r\n|\r|\n)/g, '<br>');
  }
})();




