const request = require("request");

let base_url = "http://localhost:3000/users"

let User = {
   id:1,
   name:'',
   email:'',
   password:''
};

describe("Users List API Exists", function() {
     describe("GET /users", function() {
         it("returns status code 200", function(done) {
             request.get(base_url, function(error, response, body) {
             expect(response.statusCode).toBe(200);
             done();
         });
    });

    it("API Response should be valid array of json objects 1", function(done) {
        request.get(base_url, function(error, response, body) {
          console.log(body);
          //  body = 'Hello World';
          expect(() => {
            JSON.parse(body);
          }).not.toThrow();
  
          done();
        });
      });
  
      it("API Response should be valid array of user objects 2", function(done) {
        request.get(base_url, function(error, response, body) {
          let users = JSON.parse(body);
          const userRows = users.map((userRow) => {
            expect(JSON.stringify(Object.keys(User).sort()) === JSON.stringify(Object.keys(userRow).sort())).toBeTruthy();
          });
          done();
        });
      });
    });
});