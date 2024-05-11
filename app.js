// app.js

require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require('express-session')
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth.route");
const profileRoutes = require("./routes/profile.route");
const adminRoutes = require("./routes/admin.route");
const ErrorHandler = require("./middlewares/errorHandler");
const passport = require("passport");
const googleRoutes = require("./routes/google.route");
require("./authenicators/googleAuth");

const app = express();
const port = process.env.PORT || 8000;

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.rxeclvp.mongodb.net/`
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
  });

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Documentation for your APIs",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: "Local server",
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to the API routes
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(express.json());
app.use(express.static(path.join(__dirname, "client")));
app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Middleware to serve Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  return res.json({
    message: "Welcome to API",
  });
});

app.get("/view", (req, res) => {
  return res.sendFile("./client/index.html");
});

// Routes
app.use("/auth/google", googleRoutes);
app.use("/auth", authRoutes);
app.use("/user", profileRoutes);
app.use("/admin", adminRoutes);

app.all("*", (req, res) => {
  return res.json({
    message: "Not found",
  });
});

app.use(ErrorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
