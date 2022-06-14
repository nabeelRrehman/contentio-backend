const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./Routes");
const { dbName, dbUser, dbPassword } = require("./Config");
const mongoose = require("mongoose");
var cors = require("cors");
const morgan = require("morgan");
const app = express();
// * Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("short"));
app.use(cors());

// All Port Access

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, authorization, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

// * Api routes
app.use("/api", routes);
app.use(errorHandler);

function errorHandler(err, req, res, next) {
  if (err.code && err.code === "ETIMEDOUT") {
    console.log("timeout *****");
    if (!res.headersSent) {
      res.status(408).send({
        success: true,
        message: "Timeout error",
      });
    }
  }

  next(err);
}

// DB Connection
let connectString = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.qjd1n.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(connectString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.send("Test");
});

app.use("*", function (req, res, next) {
  res.status(404).send({ status: 404, message: "Route Not Found!" });
});

app.listen(3000, () => console.log("Server is Listning"));
