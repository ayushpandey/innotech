var express = require('express');
var bodyParser = require('body-parser');
var http = require('https');
var mongoose = require('mongoose');

var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "emailtracker-15c78",
    clientEmail: "firebase-adminsdk-l1jla@emailtracker-15c78.iam.gserviceaccount.com",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC8CF7DyiFkNquj\nRfd94BI4rJTHoECPmnHf2V0BpO0X58dwGYEAOuXsaZKnpogsBImVcYIFubvzQR5G\n3Idxm0i4mBP0AACg9EBdESDHk2sguKoz5vO60G9wcF0d/N6yk9hHAdo5XCLs4HB9\nZsav1++Yh97O0u0HUz3F9JxQbKhg8Vviha8pUk9P1El07dRlzeNEHMp/KzQJDl42\npS2PbND1d+bFRbk6ay/Mo6C6uucD8Gl4dlAt1QdJqpGAAr4xtz+y0K8/ADH2ZaNK\nRD6O/9JHWlIugtGdNxsyQ+GSTRIxhzg6BxKqpZNuNwr8YkZt91QgWW2675F2Z5gj\nFFK3uct7AgMBAAECggEARRo6YW/mZ6Lj3yQ2eU8gwy1BnD+bmmrjEKYcVR9cdt2a\nYOsuinwaxZBi8jP0dWDRg1dstlf058f1rYscR7cOubBCHPjnQj+ha9KAnnfh9euH\nuX1V80Dow4S34+5rlWtaH3Zh0ZS3zSAKlztvJ26PQhok2xOPQpLn79kenTvhgYZv\nrWCdCipfBky0eJCaA0snsTEQ5/bO3trMRrZx+eIawOlNQrbioTV66+IwFxYCvpQb\nrBRFvRe+uRUX/NLN/bGEVHdCwAOMEOTrNzc+cS4UAX4gpm3Doet9pO0O3roWKrAa\n2Jg1Lw2fzOulZ/0uGJJpnUogSrtQWminwP9W6mLKUQKBgQD2Nk35UteAjQMGUvvd\nbDaU6YiFKqTxLynPr1RgcxIuK5xUNE3PUamzLcBlfqsAsDvUq85fRKkZchOQeKT5\nKNKZXugRVRJGvsn6TAPLfwggy1gngi8II1rw8bakrVQcBWXeHXzgBkvAogjzCU1q\n1GVDKpb7w+EOX1VIqNmocWHZYwKBgQDDgfmMHwooxWR8vTEge39GJQA313Sut9HW\ncGm9fkSKwZEEy9SURSnR5LgZXh3N5Sz+qZoiyfhkEhKbsUtvw3APSh+pif0YoV3y\nZVEGFBjCGiVIkRHwh8hg4YKZst4lTcodKvk1rdryQ6qxsQw55H/xGOxRPWSjXN9K\nF5yykX5tCQKBgQCLnofhFuU19MD+WRiSm8bn8vaD7YbTbldbeqVyfE6W+AwShAaL\nxldhUFSGOapnHYkQNM02oQzzbQlDJ+cFk+y5JGSdT4ypqY+H7ItKXqMRVb6LyPs6\ntjHf6HIWOGQ176mwpzAlKezTNA+3IlNQfVlfGUu9QXriV5VZOscTChje2QKBgQCZ\nPHuCxyVoVWbwmj0yL3nPWdr06cvL0coHoK5QVvKUKylmL/jbieZAXFurjmgf5DvD\nEt373H/yt3OcUndFD1L6uOdeNAiLUJdZEO5TrFbHdES6vvHnrBVzUe3SWC7j4DfF\natRPrYfJkR3uDk395kodh6JZ/putq3JcGWu5Tm5gOQKBgHGUSuSYFogQUPzjtepX\nYhFFfOyd576YFeKGR4dpZD9/2S5SyhYwqSCmyEuQuDilYi6ANLILferEWUep4qQE\nZnrRskjdpwpQFg6aqIKc4vyMCetUrTkptD/rfmN/nJ00TuI+HPWp1UIsCjzE+D3v\nAUCEuV4Tv37EYUkyoiwFxn/3\n-----END PRIVATE KEY-----\n"
  }),
  databaseURL: "https://emailtracker-15c78.firebaseio.com/"
});
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
      timestamp : String,
      fcmID: String
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
  var lastSpace = email_data.timestamp.lastIndexOf(' ');
  var colon = email_data.timestamp.indexOf(':');
  console.log(lastSpace);
  var hr = email_data.timestamp.substr(lastSpace+1,5);
  hr = tConvert(hr);
  console.log(hr);
  timestamp = email_data.timestamp.substring(0,lastSpace+1) + hr;
  console.log(timestamp);
  email_data.timestamp = timestamp;
  var log = new trackingLog (email_data);
  console.log(log);
  log.save(function(err, logResponse,num){
    if(err) console.log(err);
    else {
      //console.log(logResponse, num);
    }
  });
  //writeUserData(req.body.msgID, req.body.email);
  res.end();
});

app.post('/read', function(req,res){
  console.log("Access on /read");
  var read_data = req.body;
  var ts = read_data.timestamp.replace(/,/g,'').replace(/ at /g, ' ');
  var query = {
    sender : read_data.sender,
    recipients : read_data.recipients,
    timestamp : ts
  }
  trackingLog.find(query,function(err,data){
    if(err || data.length==0){
      res.end();
    } 
    else {
                  // This registration token comes from the client FCM SDKs.
                  console.log(data);
                  var registrationToken = data[0].fcmID; 
                  // See the "Defining the message payload" section below for details
                  // on how to define a message payload.
                  var payload = {
                    data: {
                      readBy: read_data.recipients,
                    }
                  };

                  // Send a message to the device corresponding to the provided
                  // registration token.
                  admin.messaging().sendToDevice(registrationToken, payload)
                    .then(function(response) {
                      // See the MessagingDevicesResponse reference documentation for
                      // the contents of response.
                      console.log("Successfully sent message:", response);
                    })
                    .catch(function(error) {
                      console.log("Error sending message:", error);
                    });



      console.log(data);
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


function tConvert (time) {
  // Check correct time format and split into components
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice (1);  // Remove full string match value
    time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join (''); // return adjusted time or original string
}