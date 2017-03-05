http = require('http');
url = require('url');

http.createServer(function(req, res){
	var requestURL = url.parse(req.url, true)['pathname'];
	console.log("Created server");
	if (requestURL == '/register') {
		res.writeHead(200, {'Content-Type': 'text/plain' });
		res.end("It's registering");
	}
	if (requestURL == '/email') {
		res.writeHead(200, {'Content-Type': 'text/plain' });
		res.end("It's asking for an email header");
		console.log(req.data);
	}

	else {
		res.writeHead(200, {'Content-Type': 'text/plain' });
		res.end("It's working");
	}
}).listen(process.env.PORT || 3000);
console.log("listening on port 3000");
