'use strict';

var http = require('http');
//var Router = require('kj-http-server');
//var fs = require('fs');
var jsonfile = require('jsonfile');

//var folder_route = 'https://github.com/kumji/http-server-persistance/tree/master/data/';
var countName = 0;
//var router = Router();


var server = http.createServer(function(req,res) {
	req.on('data', function(data) {
		if(req.url === '/note' && req.method === "POST") {
			var parsed = JSON.parse(data.toString());
			res.writeHead(200, {'Content-Type': 'application/json'});
			//var file = folder_route + count;
			var file = __dirname + '/../data/';
			jsonFile.writeFile(file, parsed, function(err) {
				console.error(err)
			});
		};
		
		esle if(req.method === 'GET') {
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.write(JSON.stringify({msg:'hello world'}));
		res.end();
	};
	};


	
});


server.listen(3000);
console.log('server up');