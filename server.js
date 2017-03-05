var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/email', function(req,res){
	console.log(req.body.msgID);
	res.send("/email");
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})
