const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "EasyShop API",
    description: "User Management API",
  },
  // host: "localhost:2006",
  // schemes: ["http"],
  host: "easy-shop-backend-mocha.vercel.app",
  schemes: ["https"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app.js"];

// Generate swagger doc
swaggerAutogen(outputFile, endpointsFiles, doc);
