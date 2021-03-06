const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./app/models/index");

//db.sequelize.sync();
// force drop and re-sync of database for debugging
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

var corsOptions = {
  origin:['http://localhost:3000','http://localhost'],
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
};

//set up middleware https://expressjs.com/en/guide/using-middleware.html
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome Binh's application." });
});
// set up routes i am using /api/tutorials
require("./app/routes/tutorial.routes")(app);
module.exports = app;