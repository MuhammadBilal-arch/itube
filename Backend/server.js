const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const Users = require("./routes/api/User");
const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/User", Users);

//DB Config
const db = require("./config/keys").mongoURI;

// Connect to Mongo

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected ... Boom"))
  .catch((err) => console.log(err));

const port = 4000;
app.listen(port, () => console.log(`Server is started on port ${port}`));
