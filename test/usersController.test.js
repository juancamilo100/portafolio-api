//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// let mongoose = require("mongoose");
let User = require('../src/models/user/index');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app.js');
let should = chai.should();

const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const HOST = `http://localhost:${PORT}`;
// const someController = require('../controller/someController');
// const Post = require('../model/postModel');

chai.use(chaiHttp);
//Our parent block
describe('users', () => {
    // before((done) => {
    //     mongoose.connection.db.dropDatabase(() => {
    //     console.log('Cleaning - test database dropped');
    //     });
    //   return done();
    //   });
    // beforeEach((done) => { //Before each test we empty the database
    //     User.remove({}, (err) => { 
    //        done();           
    //     });        
    // });
/*
  * Test the /GET route
  */
  describe('/GET user', () => {
      it('it should GET all the users', (done) => {
        chai.request(server)
            .get('/users/')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(2);
              done();
            });
      });
  });

  /*
  * Test the /GET user by id route
  */
 describe('/GET user', () => {
    it('it should GET a user', (done) => {
      chai.request(server)
          .get('/users/5cf1de2bf654b3686038dcee')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
            done();
          });
    });
});

});