const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment-timezone");
const dateTr = moment.tz(Date.now(), "Europe/Istanbul");

const UserSchema = new Schema({
  first_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: dateTr,
  },
});

module.exports = User = mongoose.model("users", UserSchema);
