const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

//Assertion Style
chai.should();
chai.use(chaiHttp);

describe("Login API", () => {
  //Test the Post Login Route
  describe("POST /api/login", () => {
    it("It Should POST and Get Logged In", (done) => {
      const userCredential = {
        email: "kavishgarg15@gmail.com",
        password: "kavish12345",
      };
      chai
        .request(server)
        .post("/api/login")
        .send(userCredential)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("token");
          response.body.message.should.be.eq("logged in successfully");
          response.body.should.have.property("userId");
          done();
        });
    });

    it("It Should POST and Not Get Logged In ", (done) => {
      const userCredential = {
        email: "kavishgarg@gmail.com", //Wrong Email Id
        password: "kavish12345",
      };
      chai
        .request(server)
        .post("/api/login")
        .send(userCredential)
        .end((err, response) => {
          response.should.have.status(401);
          response.body.should.be.a("object");
          response.body.should.have.property("message");
          response.body.message.should.be.eq(
            "User with this Email Does not Exists"
          );
          done();
        });
    });

    it("It Should POST and Not Get Logged In", (done) => {
      const userCredential = {
        email: "kavishgarg15@gmail.com",
        password: "kavish1234", //Wrong Password
      };
      chai
        .request(server)
        .post("/api/login")
        .send(userCredential)
        .end((err, response) => {
          response.should.have.status(401);
          response.body.should.be.a("object");
          response.body.should.have.property("message");
          response.body.message.should.be.eq("Invalid Password");
          done();
        });
    });
  });
});
