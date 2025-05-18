const express = require("express");
const app = express();
const db = require("./db");
const passport = require('./auth');
require("dotenv").config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

//Middleware Function
const logRequest = (req, res, next) => {
  console.log(
    `${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`
  );
  next(); //Move on to the next phase
};

app.use(logRequest);



const localAuthMiddleware =  passport.authenticate("local", { session: false })

app.get(
  "/",localAuthMiddleware,
  function (req, res) {
    res.send(
      "Welcome to my hotel ....How i can help you? ,we have list of menus"
    );
  }
);

//Import the router files
const personRoutes = require("./Routes/personRoutes");
const menuItemRouters = require("./Routes/menuRoutes");

//Use the routers
app.use("/person", personRoutes);
app.use("/menu", menuItemRouters);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("listening on port 3000");
});
