'use strict';

var request = require('supertest'),
	assert = require('assert');

describe('testing user controller',function(){
	describe("testing user/new route",function(){
		
		var newUserRequest = {},
			token = "Oz32z2iXO82k7YNos9Fb";
		beforeEach(function(){
			newUserRequest = request(sails.hooks.http.app)
								.post('/user/new')
								.set('Accept','application/json');			
		});
		
		it('should return error from policy',function(done){
			newUserRequest.
				send({number:"1010101010"}).
				expect(403).
				end(function(err,res){
					if(err) throw err;
					assert.equal(res.body.error,true);
					done();
				});
		});

		it('should return error for mismatching number',function(done){
			newUserRequest.
				send({number:"asdf",token:token}).
				expect(400).
				end(function(err,res){
					if(err) throw err;
					assert.equal(res.body.error,true);
					console.log(res.body.message);
					done();
				});
		});

		it('should update otp of the user',function(done){
			newUserRequest.
				send({number:"9099918588",token:token}).
				expect(200).
				end(function(err,res){
					if(err) throw err;
					assert.equal(res.body.error,false);
					assert.notEqual(res.body.data,undefined,'Data not null');
					console.log(res.body);
					assert.equal(res.body.data.id,"569784bb57f622f419714945");//9650
					done();
				});
		});

		it.skip('should add new user',function(done){
			newUserRequest.
				send({number:"9099918588",token:token}).
				expect(200).
				end(function(err,res){
					if(err) throw err;
					assert.equal(res.body.error,false);
					assert.notEqual(res.body.data,undefined,'Data not null');
					done();
				});
		});
	});

	

});
