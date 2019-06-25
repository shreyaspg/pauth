const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");

mongoose.Promise = global.Promise; //Select what promise mongoose must use
mongoose.connect("mongodb://localhost/APIAuthentication", {
  useNewUrlParser: true
});

// Initialize App
const app = express();

// MiddleWares
app.use(morgan("dev"));
app.use(bodyParser.json());

// Routes
app.use("/users", require("./routes/users"));

// Listen to PORT
app.listen(port, () => console.log(`server listening at ${port}`));
