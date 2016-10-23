http = require('http');
url = require('url');

http.createServer(function(req, res){
	var requestURL = url.parse(req.url, true)['pathname'];

	if (requestURL == '/log.gif') {
		var imgHex = '47494638396101000100800000dbdfef00000021f90401000000002c00000000010001000002024401003b';
		var imgBinary = new Buffer(imgHex, 'hex');
		res.writeHead(200, {'Content-Type': 'image/gif' });
		res.end(imgBinary, 'binary');

		console.log(req, Date.now());

	} else {
		res.writeHead(200, {'Content-Type': 'text/plain' });
		res.end("It's working");
	}
}).listen(process.env.PORT || 3000);
