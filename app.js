const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const route = require("./routes");

dotenv.config();

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.resolve(__dirname, "services")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

route(app);

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.CONNECT_DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Can't connect to database");
  });

app.listen(port, () => {
  console.log("Listening at port " + port);
});
