require('dotenv').config()

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB_URI;
db.contacts = require("./contacts.model")(mongoose);

module.exports = db;  