'use strict';
var spreadsheetId = '1ozmzzK503RbPPEmiIddd9SFcxHuXTF21fVUxV3nLWJQ';
var url = 'https://spreadsheets.google.com/feeds/list/' + spreadsheetId + '/1/public/values?alt=json';
var xhr = new XMLHttpRequest();

xhr.open('GET', url);
xhr.send();

xhr.onreadystatechange = function() {
  if (xhr.readyState != 4) return;

  if (xhr.status === 200) {
    document.getElementById("table").innerHTML = createTable(xhr.responseText);
  }
}

function createTable(tableJSON) {

}



