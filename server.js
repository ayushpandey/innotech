var express = require('express');
var bodyParser = require('body-parser');
var http = require('https');
//var firebase = require('firebase');
var app = express();

/*var config = {
    apiKey: "AIzaSyDdSQUFEElPGGDWQaMTsJgGrOAHa0lCzjs",
	authDomain: "emailtracker-15c78.firebaseapp.com",
    databaseURL: "https://emailtracker-15c78.firebaseio.com",
    storageBucket: "emailtracker-15c78.appspot.com",
    messagingSenderId: "228132621866"
};
firebase.initializeApp(config);
var database = firebase.database();
*/
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function (req, res) {
  res.send('Hello World!')
})
app.get('/register', function(req,res){
	res.send(guid().toString());
})

app.post('/email', function(req,res){
	console.log(req.body.msgID);
	console.log(req.body.email);
	var post_data = {
		email: req.body.email,
		msgID: req.body.msgID,
		read: false
	}
	var path = '/msg/1596357/'+((req.body.msgID).toString())+'.json';
	console.log(path);
	var post_options = {
      host: 'emailtracker-15c78.firebaseio.com',
      path: path,
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      }
    };
	var post_req = http.request(post_options, function(resp) {
		resp.setEncoding('utf8');
		resp.on('data', function (chunk) {
			console.log('Response: ' + chunk);
		});
	});
	post_req.write(JSON.stringify(post_data));
    post_req.end();

	//writeUserData(req.body.msgID, req.body.email);
	res.send("/email");
})

app.listen(process.env.PORT || 3000, function () {
  console.log('sparks flying!!')
});


function writeUserData(msgID, email) {
  database.ref('/msg' + email+"/"+msgID).set({
    email: email,
    msgID: msgID
  });
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}