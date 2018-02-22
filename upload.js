var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

http.createServer(function(req, res) {

	if(req.url == '/fileupload') {
		var form = new formidable.IncomingForm();

		// files is the path to the directory with uploads
		form.parse(req, function(err, fields, files) {
			var oldpath = files.filetoupload.path;
			var newpath = './' + files.filetoupload.name;
			fs.rename(oldpath, newpath, function(err) {
				if(err) throw err;
				res.write("Uploaded and moved!");
				res.end();
			});
			console.log(oldpath);
			console.log(newpath);
			console.log(files);
			console.log(fields);
			res.end('File upload successful!');
		});
	}

	else{
		res.writeHead(200, {"Content-Type": 'text/html'});
		res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
		res.write('<input type="submit">');
		res.write('</form>');
		res.end();
	}

}).listen(8080);