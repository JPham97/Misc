var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function(req, res) {
	var q = url.parse(req.url, true);
	var filename = '.' + q.pathname;
	fs.readFile(filename, function callback(err, data) {
		if(err) {
			res.writeHead(404, {'Content-Type': 'text/html'});
			return res.end("404 Not Found");
		} // finish error handling
		console.log(filename);
		res.writeHead(200, {'Content-Type': 'text/html'});
		return res.end(data);
	});
}).listen(8080);