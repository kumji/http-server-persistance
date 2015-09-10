'use strict';

var http = require('http');

var jsonFile = require('jsonfile');
var url = require('url');
var file_route = __dirname + '/../data/'
var file = file_route+'test.json';
var count = 0;

var server = http.createServer(function(req,res) {
	req.on('data', function(data) {
		if(req.url === '/note' && req.method === "POST") {
			var parsed = JSON.parse(data.toString());
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.write(JSON.stringify( {note: parsed}));
			count++;
			file = file_route+count+'.json';
			jsonFile.writeFile(file, parsed, function(err) {
				console.error(err);
			});	
			return res.end();
		};
	});

	if(req.url === '/note' && req.method === 'GET') {
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.write(JSON.stringify(jsonFile.readFileSync(file)));
		res.end();
	};
console.log(count);
});
server.listen(3000);
console.log('server up');