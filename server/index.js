const path = require('path');
const express = require("express");
const app = express();

const env = process.env.NODE_ENV || "development";
console.log(`App is running in ${env} mode`);

const cors = require('cors');
const whiteList = ['http://localhost', 'http://localhost:3000',
    "http://185.233.37.235", "http://185.233.37.235:3000"];

app.use(cors({
    origin: function (origin, callback) {
        // bypass the requests with no origin (like curl requests, mobile apps, etc )
        if (!origin) return callback(null, true);

        if (whiteList.indexOf(origin) === -1) {
            const msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// API ROUTES
require('./routes')(app);

// IMAGES: set your path dev image path
const imagePath = env === 'production' ? '/appro/images' : "../client/public/img/projects";
app.use('/images', express.static(imagePath));

// REACT APP
app.use(express.static(path.resolve(__dirname, "../client/build"), {fallthrough: false}));

// DEFAULTS
app.use(function (err, req, res, next) {
    //We can check if not api request
    if (err.status === 404) {
        res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
    } else {
        next(err);
    }
});

app.listen(process.env.PORT || 80, function(){
    console.log("Server is ready to accept connections...");
});

module.exports = app;
