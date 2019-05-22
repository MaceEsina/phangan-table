(function() {
  'use strict';

  var TABLE_CLASS = 't431__table';
  var THEAD_CLASS = 't431__thead';
  var TBODY_CLASS = 't431__tbody';
  var TH_CLASS = 't431__th';
  var TR_ODD_CLASS = 't431__oddrow';
  var TR_EVEN_CLASS = 't431__evenrow';

  var headers = ['Название услуги', 'Имя', 'Контакты', 'Описание, цены, ссылки', 'До какой даты'];
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
    table.classList.add(TABLE_CLASS);

    createTableHead(table);
    createTableBody(table, jsonObj.feed.entry);

    return table;
  }

  function createTableHead(table) {
    var head = table.createTHead();
    var tr = head.insertRow();
    var i, th;

    head.classList.add(THEAD_CLASS);

    for (i = 0; i < headers.length; i++) {
      th = document.createElement('th');
      th.innerHTML = headers[i];
      th.classList.add(TH_CLASS);
      tr.appendChild(th);
    }
  }

  function createTableBody(table, rowArray) {
    var body = document.createElement('tbody');
    var i, tr, isOdd = true;

    body.classList.add(TBODY_CLASS);
    table.appendChild(body);

    for (i = 0; i < rowArray.length; i++) {
      tr = body.insertRow();
      tr.classList.add(isOdd ? TR_ODD_CLASS : TR_EVEN_CLASS);
      createTableRow(tr, rowArray[i]);
      isOdd = !isOdd;
    }
  }

  function createTableRow(tr, data) {
    tr.insertCell().innerHTML = retainLineBreaks(data.gsx$названиеуслуги.$t);
    tr.insertCell().innerHTML = retainLineBreaks(data.gsx$имя.$t);
    tr.insertCell().innerHTML = retainLineBreaks(data.gsx$контакты.$t);
    tr.insertCell().innerHTML = retainLineBreaks(data.gsx$описаниеценыссылки.$t);
    tr.insertCell().innerHTML = retainLineBreaks(data.gsx$докакойдаты.$t);
  }

  function retainLineBreaks(str) {
    return str.replace(/(?:\r\n|\r|\n)/g, '<br>');
  }
})();




