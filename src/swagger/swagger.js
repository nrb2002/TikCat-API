const swaggerAutogen = require("swagger-autogen")(); //import swagger package

//Build the documentation

const doc = {
  info: {
    title: "FountTechs API Documentation",
    version: "1.0.0",
    description:
      "This is an API for storing and retrieving information about local startups in Kinshasa. These businesses' data are accessible through the API which can be used by any frontend. The API is built using Node.js and Express, and the documentation is generated using Swagger. The API provides endpoints for creating, reading, updating, and deleting startup information, as well as searching for startups based on various criteria. The documentation includes details about each endpoint, including the request parameters, response format, and example requests and responses. ",
    author: "Baron T.",
    "last update": "2026-05-22",
  },

  /**
   * For production: uncomment the following lines and comment out the local testing lines. Make sure to update the host and schemes as needed for your production environment.
   */

  //For production
  host:
    process.env.NODE_ENV === "production"
      ? "founttech-api.onrender.com"
      : "localhost:8080",
  schemes: ["http", "https"],

  //For local testing
  // host: 'localhost:8080',
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
