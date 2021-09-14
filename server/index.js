const express = require("express");
const app = express();
const cors = require('cors')({
    origin: 'http://localhost:3000',
});
app.use(cors);

const bodyParser = require('body-parser');
app.use(bodyParser.json());

require('./routes')(app);

app.listen(8080, function(){
    console.log("Server is ready to accept connections...");
});

module.exports = app;
