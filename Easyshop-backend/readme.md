# **EasyShop** _Backend_

### Endpoint

_http://localhost:port_

#####

_https://easy-shop-backend-mocha.vercel.app_

# **Docs**

[easyshop/docs](https://easy-shop-backend-mocha.vercel.app/docs)

### Deploy in vercel

- **deploy issue** // use vercel.json for nested routing
- **.env handle**
  - mongoDB url (atlas and local) for offline codding
  - originLocal, deployedOrigin
- **cors**
  - (localhost Origin and deployed origin)
  - cors for postman req.secure = undefined
  - must use credential for cookie
- **cookie not set problem**
  - http, secure , samesite, maxAge handle with isSecure for both environment (vercel and local)
  - use must be app.enable("proxy trust") for (https) vercel

### problems && setup guided backend

- initial setup
  - app.enable("trust proxy"); // for vercel https enable
  - modngoDBconnection(); // not middleware only function call
  - app.use(cors(corseSEtup)); // cors setup
  - app.use(cookieParser()); // get cookie
  - app.use(express.json()); // receive
  - app.use(express.urlencoded({ extended: true })); // for from data collection
  - app.use(passport.initialize());
    -passport initialize not passport-jwt its only passport when you use any package from passport.js then use it must like passport-jwt, passport-google, passport-github

- other issue :
  - **import / ES6** // when you use import then use export only but when you use require then use must be module.export
  - **schema email candidate key** // must be use sparse: true because it ignore duplicate error for several time save empty email
  - **use validator middleware** // because ifelse create huge ugly code
  - **swagger error** // first install swagger-ui-express and swagger-autogen then create a file in root directory "swagger.js" setup following the documentation npm swagger ui express and follow app.js like this `  app.use((req, res, next) => {
  console.log("API request URL:", req.originalUrl);
  console.log("API request from:", req.headers.origin);
  next();
});
app.get("/", (req, res) => {
  res.send("our server its working now ....");
});
 `

### .ENV file setup :

- **port** = for localhost
- **URL_mongoDB** =
- **salt** = at least controllable value like under 10
- **SECRETE_JWT_KEY** =
- **CORS_LOCAL** = local nothing but production e something
- **SMTP_USER** =
- **SMTP_PASS** =
- **origin1** = //localhost
- **origin2** = //production
