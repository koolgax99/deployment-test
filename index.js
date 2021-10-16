const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const cors = require("cors");
const db = require("./app/models");

const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//mongodb connection 
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });


//importing all the routes
require("./app/routes/contacts.routes")(app);

// app.use(express.static(path.join(__dirname, 'client/build')));
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, 'client/build')));
//     app.get('*', (req, res) => {
//         res.sendfile(
//             path.join(__dirname = 'client/build/index.html')
//         );
//     }
//     )
// }
app.use(express.static(path.join(__dirname, 'client/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build'))
})

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});