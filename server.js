const express = require("express");
const app = express();
const db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json());



app.get("/", function (req, res) {
  res.send(
    "Welcome to my hotel ....How i can help you? ,we have list of menus"
  );
});

//Import the router files
const personRoutes = require("./Routes/personRoutes");
const menuItemRouters = require('./Routes/menuRoutes');

//Use the routers
app.use("/person", personRoutes);
app.use("/menu", menuItemRouters);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
