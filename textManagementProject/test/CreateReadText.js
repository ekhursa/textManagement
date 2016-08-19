var chai = require('chai');
//var server = require('../server/app');
var should = chai.should();
var request = require('request');
var expect = chai.expect;
var supertest = require('supertest');
var api = supertest('http://localhost:3000');

describe('Texts', function() {
  /*it('should list the texts GET', function(done) {
  chai.request(server)
    .get('/texts')
    .end(function(err, res){
      res.should.have.status(200);
      done();
    });
});*/
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
	  expect(res.body.user).to.equal("tester786");
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
});