const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const app = express();

const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use('/', routes);

const server = app.listen(3000, function() {
    console.log("app running on port.", server.address().port);
});