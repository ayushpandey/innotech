http = require('http');
url = require('url');
http.createServer(function(req, res){
	res.writeHead(200, {'Content-Type': 'text/plain' });
	res.end("It's working");
}).listen(process.env.PORT || 3000);
console.log("listening on port 4000");
