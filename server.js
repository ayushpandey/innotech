http = require('https');
url = require('url');
http.createServer(function(req, res){
	res.writeHead(200, {'Content-Type': 'text/plain' });
	res.send("It's working");
}).listen(process.env.PORT || 3000);
console.log("listening on port 3000");
