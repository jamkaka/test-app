require("dotenv").config({ path: "./config.env" });
const express = require("express");
// router
const serverInit = require("./init/init");
const dbInit = require("./init/db");
const routerInit = require("./api/routes");
const securityInit = require("./init/security");
// express init.
const app = express();

// init
serverInit(app);
securityInit(app);
dbInit();
routerInit(app);

// catch all bad routes.
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "error",
    data: {
      message: "This route is not found!"
    }
  });
});
