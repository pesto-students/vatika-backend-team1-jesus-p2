const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

//Assertion Style
chai.should();
chai.use(chaiHttp);

describe("Address API", () => {
  //Test the Get Address Route
  describe("GET /address", () => {
    it("It Should GET Array of All Address", (done) => {
      chai
        .request(server)
        .get("/address")
        .query({
          userId: "634ccbae8ff0e4f8653364e1",
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          done();
        });
    });

    it("It Should Not GET any Address", (done) => {
      chai
        .request(server)
        .get("/addresss") // Wrong URL
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.be.a("object");
          done();
        });
    });
  });

  //Test the Post Address Route
  describe("POST /address", () => {
    it("It Should POST a new Address", (done) => {
      const newAddress = {
        userId: "634ccbae8ff0e4f8653364e2",
        firstName: "Manoj",
        lastName: "Gupta",
        address: "44 Usha Nagar",
        apartmentNo: "Annpurna Road",
        city: "Indore",
        state: "MP",
        pincode: "452009",
      };
      chai
        .request(server)
        .post("/address")
        .send(newAddress)
        .end((err, response) => {
          response.should.have.status(200);
          response.text.should.be.eq("Address Saved Successfully");
          done();
        });
    });

    it("It Should Not POST a Existing Address", (done) => {
      const existingAddress = {
        userId: "634ccbae8ff0e4f8653364e1",
        firstName: "kavish",
        lastName: "garg",
        address: "122 Rohini Nagar",
        apartmentNo: "Main Road",
        city: "Indore",
        state: "MP",
        pincode: "432122",
      };
      chai
        .request(server)
        .post("/address")
        .send(existingAddress)
        .end((err, response) => {
          response.should.have.status(400);
          response.text.should.be.eq("Address Already Saved");
          done();
        });
    });
  });

  //Test the Delete Address Route
  describe("DELETE /address", () => {
    it("It Should DELETE a Address", (done) => {
      chai
        .request(server)
        .delete("/address")
        .query({
          id: "634ccbae8ff0e4f8653364e2",
        })
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });

  });
});
