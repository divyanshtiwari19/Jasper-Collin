require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const csrf = require("csurf");
const morgan = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { rateLimit } = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const startCluster = require("./cluster");
const connectDB = require("./database/db");

const startServer = async () => {
  const app = express();
  connectDB();

  // Web Security Middlewares
  app.use(helmet());
  app.use(express.json({ limit: "5mb" }));
  app.use(cookieParser());
  app.use(morgan("dev"));
  // app.enable("trust proxy");
  app.use(mongoSanitize()); // I have added this to prevent -  NoSQL Injection Attacks

  app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

  // Session Management - for auth (Stored in MongoDB)
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.DATABASE_URL,
        dbName: process.env.DATABASE_NAME,
        collectionName: "sessions",
        ttl: 24 * 60 * 60,
        autoRemove: "interval",
        autoRemoveInterval: 10,
      }),
    })
  );

  const csrfProtection = csrf({ cookie: true });
  app.use(csrfProtection);
  app.get("/api/csrf-token", (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
  });

  // Rate Limiting (Prevents DDoS Attacks)
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests, please try again later.",
  });
  app.use(limiter);

  // api route
  fs.readdirSync("./routers").map((r) =>
    app.use("/api", require(`./routers/${r}`))
  );

  // Load API routes dynamically
  const routerPath = "./routers";
  if (fs.existsSync(routerPath)) {
    fs.readdirSync(routerPath).forEach((file) => {
      app.use("/api", require(`${routerPath}/${file}`));
    });
  }

  app.get("/api/", (req, res) => {
    res.json({ message: `Hello Backend from ${process.pid}!` });
  });

  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} started on port ${PORT}`);
  });
};

startCluster(startServer);

module.exports = startServer;
