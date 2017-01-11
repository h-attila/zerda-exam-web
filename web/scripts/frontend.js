// AJAX communication with server
var ajax = (function () {

  // Send data to the server
  function sendData(feedback, scale, email) {
    var data = { feedback: feedback, scale: scale, email: email };
    talkToServer('POST', '/exam', data, app.displayResults);
  }

  // Setting up server communication
  function talkToServer(method, additionalUrl, data, callbackFunc) {
    var url = 'http://localhost:3000' + additionalUrl;
    var httpRequest = new XMLHttpRequest();
    httpRequest.open(method, url, true);
    httpRequest.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

    // if data exist, in no data, send empty form
    data ? httpRequest.send(JSON.stringify(data)) : httpRequest.send();

    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        var response = JSON.parse(httpRequest.response);
        callbackFunc(response);
      }
    };
  }
  return {
    // public functions
    sendData: sendData,

  };
})();

// Main app
var app = (function () {

  // HTML front-side elements
  var button = document.querySelector('.button');
  var loadText = document.querySelector('.load-text');
  var feedback = document.querySelector('.feedback');
  var scale = document.querySelector('.scale');
  var email = document.querySelector('.email');
  var responseList = document.querySelector('.response-list');

  // Events handling
  button.addEventListener('click', function () {
    loadText.innerHTML = 'Loading ...';
    ajax.sendData(feedback.value, scale.value, email.value);
  });

  // display projest list or alert box, depending from the response data
  function displayResults(response) {

    // show alert box
    if (response.status === 'error') {
      responseList.innerHTML = '';
      loadText.innerHTML = '';
      vex.dialog.alert(response.message);

      // show Top Secret project list
    } else {
      responseList.innerHTML = '';
      loadText.innerHTML = 'Congratulation! Your secret projects are:';
      response['projects'].forEach(function (item) {
        var listItem = document.createElement('li');
        listItem.innerHTML = item.project_name;
        responseList.appendChild(listItem);
      });
    }
  }
  return {
    // public functions
    displayResults: displayResults,
  };
})();

app();
