const express = require("express");
const path = require('path');
const cors = require("cors");
const db = require("./app/models");

const app = express();

var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendfile(
            path.join(__dirname = 'client/build/index.html')
        );
    }
    )
}


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});