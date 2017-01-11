var server = require('express');
var bodyParser = require('body-parser');
var validator = require('./validator.js');
var mysql = require('mysql');

// responseOK message
const responseOk = {
    "status": "ok",
    "projects": [
      "secret project 1",
      "secret project 2"
    ]
  };

// responseErr message
const responseErr = {
  "status": "error",
  "message": "Thank you filling our form!"
}

// set static content
var app = server();
app.use('/', server.static('web'));
app.use(bodyParser.json());

// Post data from fromt to decode, and send back
app.post('/exam', function (req, res) {
  var feedback = req.body.feedback;
  var scale = parseInt(req.body.scale, 10);
  var email = req.body.email;

  if (validator.emailOk(email) && validator.scaleOk(scale) && validator.feedbackOk(feedback)) {
    database.read(function (data){
      responseOk.projects = data;
      res.status(200).json(responseOk);
    })
  } else {
    res.status(200).json(responseErr);
  }
});


// database handling
var database = (function () {

  // setting up database connection
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'myTopSecretNewPassword123',
    database: 'secretprojects',
  });

  // close db connection - not used now
  function closeDatabaseConnection() {
    connection.end(function () {
      console.log('connection closed successfully');
    });
  }

  function dataRead(callback) {

    connection.query('SELECT project_name FROM projects', function (err, data) {
      if (err) throw err;
      console.log('Data from database:');
      // data.forEach(function (row) {
      //   console.log(`project name: ${row.project_name}`);
      // });
      console.log(data);
      callback(data);
    });
  }
  return {
    read: dataRead,
  };
})();


// START SERVER
var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server running on port ${port}`);
});
