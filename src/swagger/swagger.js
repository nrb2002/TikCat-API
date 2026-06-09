const swaggerAutogen = require("swagger-autogen")(); //import swagger package

//Build the documentation

const doc = {
  info: {
    title: "TikCat API Documentation",
    version: "1.0.0",
    description:
      "API documentation for the TikCat which is a ticketing platform, built with Node.js, Express, and MongoDB. This documentation provides details on all available endpoints, request/response formats, and authentication methods.",
    author: "Baron T. & Nompilo N.",
    "last update": "2026-06-09",
  },

  /**
   * For production: uncomment the following lines and comment out the local testing lines. Make sure to update the host and schemes as needed for your production environment.
   */

  //For production
  host:
    process.env.NODE_ENV === "production"
      ? "tikcat-api.onrender.com"
      : "localhost:5000",
  schemes: ["https", "http"],

  //For local testing
  // host: 'localhost:5000',
  // schemes: ['http']

  securityDefinitions: {
    BearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "Enter JWT token as: Bearer <token>",
    },
  },
};

const outputFile = "./swagger.json";
const endpointFiles = ["../app.js"]; //get all endpoint files via the server to avoid routes confusion

swaggerAutogen(outputFile, endpointFiles, doc); //Generates the documentation
