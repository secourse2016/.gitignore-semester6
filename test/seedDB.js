// var assert         = require('chai').assert;
// var expect         = require('chai').expect;
// var app            = require('../app.js');
// var request        = require('supertest');
// var seedDB         = require('../database/seed.js');
// var clear          = require('../database/clear');
// var flight         = require('../app/models/flight');
// var airport        = require('../app/models/airport');
//
//
// before(function(done){
//     clear.clearDB(function(err){
//         done();
//     });
// });
//
// /**
//  *	test seeding database with Airports
//  */
// describe('Seed Airports Function',function(){
//     this.timeout(7000);
//     var seedAirports = seedDB.seedAirports;
//     it('should populate the db with Airports if db is empty returning true',function(done){
//       seedAirports(function(err, seed){
//         assert.isTrue(seed, 'Airports collection is empty');
//         done();
//       });
//     });
//     it('should have populated the Airports collection with 6726 Airport',function(done){
//         airport.count(function(err, count){
//           assert.strictEqual(6726,count,'database contains 6726 Airport');
//           done();
//       });
//     });
//     it('should not seed db again if db is not empty returning false in the callback', function(done) {
//         seedAirports(function (err, seed){
//           assert.isNotTrue(seed, 'db is full');
//           done();
//         });
//     });
// });
// /**
//  *	test seeding database with Flights
//  */
// describe('Seed Flights Function',function(){
//     this.timeout(5000);
//     var seedFlights = seedDB.seedFlights;
//     it('should populate the db with Flights if db is empty returning true',function(done){
//       seedFlights(function(err, seed){
//         assert.isTrue(seed, 'Flights collection is empty');
//         done();
//       });
//     });
//     it('should have populated the Flights collection with 1000 Flights',function(done){
//         flight.count(function(err, count){
//           assert.strictEqual(1000,count,'database contains 1000 Flights');
//           done();
//       });
//     });
//     it('should not seed db again if db is not empty returning false in the callback', function(done) {
//         seedFlights(function (err, seed){
//           assert.isNotTrue(seed, 'db is full');
//           done();
//         });
//     });
// });
// /**
//  *	test seeding database with Flights
//  */
// describe('Seed Database Function',function(){
//     this.timeout(10000);
//     it('should populate the db if db is empty returning true',function(done){
//         clear.clearDB(function(err){
//             seedDB.seed(function(err, seed){
//               assert.isTrue(seed, 'db is empty');
//               done();
//             });
//         });
//     });
//     it('should have populated the database with 1000 Flights ',function(done){
//         flight.count(function(err, count){
//           assert.strictEqual(1000,count,'database contains 1000 Flights');
//           done();
//       });
//     });
//     it('should have populated the Airports collection with 6726 Airport',function(done){
//         airport.count(function(err, count){
//           assert.strictEqual(6726,count,'database contains 6726 Airport');
//           done();
//       });
//     });
// });
// /**
//  * test seed route it give json message
//  */
// describe('Seed DB Route', function(){
//     request = request(app);
//     this.timeout(10000);
//     it('/db/seed should seed db', function(done){
//         clear.clearDB(function(err){
//             request.get("/db/seed").set("Accept", "text/html").expect(200).end(function(err,res){
//                 expect(res.body).to.have.property("message");
//                 assert.strictEqual(res.body.message,'database seeded successfuly');
//                 done();
//             });
//         });
//       });
//
//       it('should have populated the database with 1000 Flights ',function(done){
//           flight.count(function(err, count){
//             assert.strictEqual(1000,count,'database contains 1000 Flights');
//             done();
//         });
//       });
//       it('should have populed the Airports collection with 6726 Airport',function(done){
//           airport.count(function(err, count){
//             assert.strictEqual(6726,count,'database contains 6726 Airport');
//             done();
//         });
//       });
//       it('/db/seed should not seed db', function(done){
//               request.get("/db/seed").set("Accept", "text/html").expect(200).end(function(err,res){
//                   expect(res.body).to.have.property("message");
//                   assert.strictEqual(res.body.message,'database was seeded');
//                   done();
//               });
//       });
// });
