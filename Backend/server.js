var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
const mongoose = require("mongoose");

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
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
