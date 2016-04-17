var app = require('../app.js');
var assert = require('chai').assert;
var request = require('supertest');

// JWT Token Generation
var jwt = require('jsonwebtoken');
var token = jwt.sign({}, process.env.SECRET_KEY);

describe('JWT Middleware', function() {
    request = request(app);

    it('/api/airports should return 403 when token is not provided', function(done){
        request.get('/api/airports').end(function(err, res){
                   assert.equal(res.body.message, 'Unauthorized access.');
                   assert.equal(res.status, 403);
                   done(err);
        });
    });

    it('/api/airports should return 403 when a fake token is provided (Token Mismatch)', function(done){
        request.get('/api/airports').set('x-access-token', 'FalsyToken').end(function(err, res){
                   assert.equal(res.body.message, 'Token Mismatch. Unauthorized Access.');
                   assert.equal(res.status, 403);
                   done(err);
        });
    });

    it('/api/airports should return 200 when token is provided correctly', function(done){
        request.get('/api/airports').set('x-access-token', token)
               .expect(200, done);
    });
});
