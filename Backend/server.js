var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const redis = require("redis");
const connectRedis = require("connect-redis");

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

const RedisStore = connectRedis(session);
const redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
});

redisClient.on("error", function (err) {
  console.log("Could not establish a connection with redis. " + err);
});
redisClient.on("connect", function (err) {
  console.log("Connected to redis successfully");
});

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "secret$%^134",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie
      maxAge: 1000 * 60 * 10, // session max age in miliseconds
    },
  })
);

mongoose
  .connect("mongodb://localhost:27017/movieapp", { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var Users = require("./routes/Users");

app.use("/users", Users);

var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log("Server is running on port: " + port);
});
