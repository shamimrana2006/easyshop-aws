require("dotenv").config();

const allowedOrigins = [
  process.env.origin1,
  process.env.origin2,
  process.env.origin3,
  process.env.origin4,
  process.env.URL,
].filter(Boolean); // remove undefined or empty

const corseSEtup = {
  origin: (origin, callback) => {
    // console.log("🌍 Incoming request origin:", origin); // 👈 লগ হবে সবসময়

    if (!origin) {
      return callback(null, true); // allow server-to-server / Postman
    }

    if (allowedOrigins.includes(origin.trim())) {
      // console.log("✅ Allowed by CORS:", origin);
      return callback(null, true);
    } else {
      console.log("❌ Blocked by CORS:", origin);
      // return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

module.exports = { corseSEtup };
