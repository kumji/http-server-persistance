'use strict';

var chai = require('chai'),
	expect = chai.expect;
chai.use(require('chai-http'));
chai.use(require('chai-fs'));

require(__dirname + '/../server');

describe('http get/post test', function() {
	it('should write a json file', function(done) {
		chai.request('localhost:3000')
			.post('/note')
			.send({noteBody: 'hello world'})
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body.noteBody).to.eql('hello world');
				expect(__dirname+'/../data/1.json').to.be.a.file();
				done();
			});
	});

	it('should be able to get notes', function(done) {
		chai.request('localhost:3000')
			.get('/note')
			.end(function(err, res){
				expect(err).to.eql(null);
				expect(res.status).to.eql(200);
				expect(res.body).to.eql({ noteBody: 'hello world'});
				done();
			})
	})
});

