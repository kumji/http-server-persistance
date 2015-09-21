'use strict';

var http = require('http');
var fs = require('fs');
var url = require('url');
var file_route = __dirname + '/data/'
var file;
var count = 0;

var server = http.createServer(function(req,res) {
	req.on('data', function(data) {
		if(req.url === '/note' && req.method === "POST") {
			var parsed = JSON.parse(data.toString());
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.write(JSON.stringify(parsed));
			count++;
			file = file_route+count+'.json';
			fs.writeFileSync(file, data);
			return res.end();
		};
	});

	if(req.url === '/note' && req.method === 'GET') {
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.write(fs.readFileSync(file));
		console.log(file);
		res.end();
	};
});
server.listen(3000);
console.log('server up');