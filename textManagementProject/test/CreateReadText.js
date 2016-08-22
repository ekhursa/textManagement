var chai = require('chai');
var should = chai.should();
var request = require('request');
var expect = chai.expect;
var supertest = require('supertest');
var api = supertest('http://localhost:3000');

var textIdToReply;

describe('Texts', function() {
 it('POST a Text, response code should be 200', function (done) {
  api.post('/texts')
  .send({
	  text: "We are Posting a Text",
	  user: "tester123",
	  city: "toronto"
  })
  .expect(200,done);
});

 it('POST a Text, Verify fields text, city, user, date, textId are present in response', function (done) {
  api.post('/texts')
  .send({
	  text: "We are verifying some fields",
	  user: "tester456",
	  city: "brampton"
  })
  .expect(200)
  .end(function(err, res){
	  expect(res.body).to.have.property("text");
	  expect(res.body).to.have.property("city");
	  expect(res.body).to.have.property("date");
	  expect(res.body).to.have.property("_id");
	  expect(res.body).to.have.property("user");
	  done();
  })
});

 it('POST a Text, Verify values of fields text, city, user, date, textId in response', function (done) {
  api.post('/texts')
  .send({
	  text: "We are verifying the values of the fields",
	  user: "tester786",
	  city: "mississauga"
  })
  .expect(200)
  .end(function(err, res){
	  expect(res.body.text).to.equal("We are verifying the values of the fields");
	  expect(res.body.city).to.equal("mississauga");
	  expect(res.body.date).to.not.equal(null);
	  expect(res.body._id).to.not.equal(null);
	  textIdToReply = res.body._id;
	  expect(res.body.user).to.equal("tester786");
	  done();
  })
});

 it('Reply to a Text, Replying to an existing text using POST', function (done) {
  api.post('/texts')
  .send({
	  text: "I am replying to an Existing text",
	  user: "tester489",
	  city: "mississauga",
	  parentId: textIdToReply
	  
  })
  .expect(200)
  .end(function(err, res){
	  expect(res.body.text).to.equal("I am replying to an Existing text");
	  expect(res.body.city).to.equal("mississauga");
	  expect(res.body.date).to.not.equal(null);
	  expect(res.body._id).to.not.equal(null);
	  expect(res.body.user).to.equal("tester489");
	  expect(res.body.parentId).to.equal(textIdToReply);
	  done();
  })
});

 it('Verifying Reply is shown properly in Forum View', function (done) {
  api.get('/texts/forumView')
  .expect(200)
  .end(function(err, res){
	  for (var i=0; i < res.body.length; i++){
		  if (res.body[i]._id == textIdToReply && res.body[i].children){
			  expect(res.body[i].children.length).to.equal(1);
		  }
	  }
	  done();
  })
});

 it('GET all Texts, Response Code should be 200, response should be an Array', function (done) {
  api.get('/texts')
  .expect(200)
  .end(function(err, res){
	  expect(res.body).to.be.an('Array');
	  done();
  })
});
 it('GET all Texts in Forum View, response code should be 200, response should be of type object', function (done) {
  api.get('/texts/forumView')
  .expect(200,done);
});

 it('POST a Text, response time should be less than 10 ms', function (done) {
	 this.timeout(10);
  api.post('/texts')
  .send({
	  text: "We are Posting a Text",
	  user: "tester1543",
	  city: "lahore"
  })
  .expect(200,done);
});

 it('GET all Texts in Forum View, response time should be less than 50 ms', function (done) {
	this.timeout(50);
  api.get('/texts/forumView')
  .expect(200,done);
});

 it('GET all Texts, response time should be less than 30 ms', function (done) {
  this.timeout(30);
  api.get('/texts')
  .end(function(err, res){
	  expect(res.body).to.be.an('Array');
	  done();
  })
});
});