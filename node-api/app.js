const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");

const fs = require("fs");

// create our express app
const app = express();
// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
// route
const routes = require("./Routes/Route");
app.use("/", routes);

const PORT = 9000;

//start server
app.listen(PORT, () => {
  console.log(`listeniing at port: ${PORT}`);
});
