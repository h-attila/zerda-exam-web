//AJAX communication with server
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

    // if data exist
    data ? httpRequest.send(JSON.stringify(data)) : httpRequest.send();

    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        var response = JSON.parse(httpRequest.response);
        if (response.status === 'error') {
          console.log('error');
        }
        callbackFunc(response);
      }
    };
  };

  return {
    // public functions
    sendData: sendData,

  };
})();

// Main app
var app = (function () {

  // HTML front-side elements
  var button = document.querySelector('.button');
  var loadText = document.querySelector('.load-text')
  var feedback = document.querySelector('.feedback');
  var scale = document.querySelector('.scale');
  var email = document.querySelector('.email');
  var responseList = document.querySelector('.response-list');

  // Events handling
  button.addEventListener('click', function () {
    console.log(feedback.value, scale.value, email.value);
    loadText.innerHTML = 'Loading ...';
    ajax.sendData(feedback.value, scale.value, email.value);
  });

  function displayResults (response) {
    if (response.status === 'error') {
      responseList.innerHTML = '';
      vex.dialog.alert(response.message);
    } else {
      responseList.innerHTML = '';
      loadText.innerHTML = 'Congratulation! Your secret projects are:';
      response["projects"].forEach(function (item) {
        var listItem = document.createElement('li');
        console.log(item);
        listItem.innerHTML = item.project_name;
        console.log(listItem.innerHTML);
        responseList.appendChild(listItem);
      });

    }
  }

  return {
    // public functions
    displayResults: displayResults

  };
})();


app();
