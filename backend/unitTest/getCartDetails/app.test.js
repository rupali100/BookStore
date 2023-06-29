const { expect } = require("chai");
const proxyquire = require("proxyquire");
const lambdaTester = require("lambda-tester");

const { validInput} = require("./mock");


describe("Success", function () {
  let lambda = null;
  let awsSdk = {};

  beforeEach(function () {
    // Exporting the lambda with mock dependencies /
    lambda = proxyquire.noCallThru().load("../../scripts/getCartDetails/app", {
      "aws-config.json": require("../../aws-config.json"),
      "aws-sdk": awsSdk,
    });
  });

  describe("Successful Invocation", function () {
    let mockData = null;

    before(function () {
      // Attach mock function to data services (mocked)
      awsSdk = {
        // Mocking DB call
        config: {
          update: function () {
            return "ap-south-1";
          },
        },
        
        DynamoDB: {
          DocumentClient: function () {
            return {
              get: function () {
                return {
                  promise: function () {
                    return [
                      {
                        Items: [
                          {
                            id: "2",
                            media:
                              "https://cms.buybooksindia.com/uploads/books/9780143455691_0_1645603696.jpeg",
                            name: "The Hidden Hindu\n",
                            price: "259.00",
                            rating: "3",
                          },
                        ],
                      },
                    ];
                  },
                };
              },
              scan: function () {
                return {
                  promise: function () {
                    return [
                      {
                        Items: [
                          {
                            id: "2",
                            media:
                              "https://cms.buybooksindia.com/uploads/books/9780143455691_0_1645603696.jpeg",
                            name: "The Hidden Hindu\n",
                            price: "259.00",
                            rating: "3",
                          },
                        ],
                      },
                    ];
                  },
                };
              },
            };
          },
        },
      };

      // Get valid inputs from mock.js
      mockData = validInput();
    });

    it("with data array", function (done) {
      // Execute lambda function using lambdaTester package
      lambdaTester(lambda.getCartDetails)
        .event(mockData) // Passing input data
        .expectResult((result) => {
          // Check if code exist
          console.log("-----status code---", result);
          expect(result.statusCode).to.exist;

          // Check if code =200
          expect(result.statusCode).to.equal(200);


          done();
        })
        .catch(done); // Catch assertion errors
    });
  });
});
