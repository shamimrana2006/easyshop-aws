const express = require("express");
require("dotenv").config();
const passport = require("passport");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");
var cookieParser = require("cookie-parser");
const path = require("path");
const {
  client_error,
  server_error,
} = require("./controller/response_controller");
const { userManagement_router } = require("./routers/user_Management_rout");
require("./controller/passportjwt");
const { modngoDBconnection } = require("./controller/mongodDBConnection");
const { corseSEtup } = require("./controller/Cors");

const app = express();

//-------------------------------------------------------initial setup-------------------------------

app.enable("trust proxy");
modngoDBconnection();
// app.use((req, res, next) => {
//   console.log(req.headers.origin);
//   next();
// });
app.use(express.static(path.join(__dirname, "../EasyShop-frontend/dist")));
app.use(cors(corseSEtup));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

//-------------------------------------------------------routing-------------------------------

// app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "EasyShop API Docs",
  })
);
app.use(
  "/swagger-ui",
  express.static(path.dirname(require.resolve("swagger-ui-dist")))
);

app.use((req, res, next) => {
  console.log("API request URL:", req.originalUrl);
  console.log("API request from:", req.headers.origin);
  next();
});
// app.get("/", (req, res) => {
//   res.send("our server its working now ....");
// });

app.use("/join", userManagement_router);

// error handling:
app.use(client_error); //page not found error
app.use(server_error); // type mistake or another error

module.exports = app;
