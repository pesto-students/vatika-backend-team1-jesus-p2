const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

//Assertion Style
chai.should();
chai.use(chaiHttp);

describe("SignUp API", () => {
  //Test the Post Login Route
  describe("POST /api/signup", () => {
    it("It Should POST and Get SingUp", (done) => {
      const newUserCredential = {
        userName: "test",
        email: "test@gmail.com",
        password: "test1234",
      };
      chai
        .request(server)
        .post("/api/signup")
        .send(newUserCredential)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a("object");
          response.body.should.have.property("message");
          response.body.message.should.be.eq(
            "An Email sent to your account please verify"
          );
          done();
        });
    });

    it("It Should POST and Not Get SingUp", (done) => {
      const userCredential = {
        email: "kavishgarg15@gmail.com", //Email Id Already Exists
        password: "kavish12345",
      };
      chai
        .request(server)
        .post("/api/signup")
        .send(userCredential)
        .end((err, response) => {
          response.should.have.status(409);
          response.body.should.be.a("object");
          response.body.should.have.property("message");
          response.body.message.should.be.eq(
            "User with given email already Exist!"
          );
          done();
        });
    });
  });
});
