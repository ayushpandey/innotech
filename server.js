var express = require('express');
var bodyParser = require('body-parser');
var http = require('https');
var mongoose = require('mongoose');
var app = express();

mongoose.connect(process.env.MONGODB_URI, function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});

Schema = new mongoose.Schema({
      ID       : String, 
      sender    : String,
      recipients : Array,
      subject : String,
      timestamp : String
    }),

trackingLog = mongoose.model('trackingLog',Schema);

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!')
});
app.get('/register', function(req,res){
	res.end(guid().toString());
});

app.post('/email', function(req,res){
  console.log("Got something");
  var email_data = req.body;
  email_data.timestamp = (email_data.timestamp.substr(0,email_data.timestamp.lastIndexOf(":"))).trim();
  var log = new trackingLog (email_data);
  console.log(email_data);
  log.save(function(err, logResponse,num){
    if(err) console.log(err);
    else {
      console.log(logResponse, num);
    }
  });
  //writeUserData(req.body.msgID, req.body.email);
});

app.post('/read', function(req,res){
  console.log("Access on /read");
  var read_data = req.body;

  var ts = read_data.timestamp.split(',')
  timestamp = "/^"+ts[0]+" "+ts[1];
  var query = {
    sender : read_data.sender,
    recipients : read_data.recipients,
    timestamp : {$regex: timestamp}
  }
  trackingLog.find(query,function(err,data){
    console.log(query);
    if(err){
      console.log(err);
      res.end(err.toString());
    } 
    else {
      res.end(data.toString());
    }
  }); 
});

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