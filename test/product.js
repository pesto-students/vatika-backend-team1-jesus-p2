const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

//Assertion Style
chai.should();
chai.use(chaiHttp);

describe("Product API", () => {
  
    //Test the Get Product Route
  describe("GET /product", () => {
    it("It Should GET Array of 45 Products", (done) => {
      chai
        .request(server)
        .get("/product")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.be.eq(45);
          done();
        });
    });

    it("It Should Not GET Array of 45 Products", (done) => {
      chai
        .request(server)
        .get("/products") // Wrong URL
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  
  //Test the Get (by Name) Product Route
  describe("GET /product/:name", () => {
    it("It Should GET a Product by Name", (done) => {
      const name = "Broken Heart";
      chai
        .request(server)
        .get("/product/" + name)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("name");
          response.body.should.have.property("price");
          response.body.should.have.property("description");
          done();
        });
    });

    it("It Should Not GET a Product by Name", (done) => {
      const name = "Mango";
      chai
        .request(server)
        .get("/product/" + name)
        .end((err, response) => {
          response.should.have.status(201);
          response.text.should.be.eq("No Products to Display");
          done();
        });
    });
  });

  
  //Test the Post Product Route
  describe("POST /product", () => {
    it("It Should POST a new Product", (done) => {
      const newProduct = {
        name: "Mango",
        price: 100,
        description: "One of the most popular house plants.",
        rating: 4,
        category: "interior",
        kingdom: "Thallophyta",
        maintain: "mid",
        sunlight: 5,
        water: 3,
        image: "Yet to Update",
      };
      chai
        .request(server)
        .post("/product")
        .send(newProduct)
        .end((err, response) => {
          response.should.have.status(201);
          response.text.should.be.eq(
            `${newProduct.name} Inserted Successfully in DB`
          );
          done();
        });
    });

    it("It Should Not POST a Existing Product", (done) => {
      const existingProduct = {
        name: "Broken Heart",
        price: 100,
        description: "One of the most popular house plants.",
        rating: 4,
        category: "interior",
        kingdom: "Thallophyta",
        maintain: "mid",
        sunlight: 5,
        water: 3,
        image: "Yet to Update",
      };
      chai
        .request(server)
        .post("/product")
        .send(existingProduct)
        .end((err, response) => {
          response.should.have.status(400);
          response.text.should.be.eq("Product Already Exists");
          done();
        });
    });
  });
});
