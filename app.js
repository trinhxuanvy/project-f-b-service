import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import mongooes from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const __dirname = path.resolve();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const port = process.env.PORT || 3000;

mongooes.connect(
    process.env.CONNECT_DATABASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(() => {
    console.log("Connected to database");

    app.listen(port, () => {
        console.log("Listening at port " + port);
    });
}).catch((err) => {
    console.log("Can't connect to database");
});

app.get("/", (req, res) => {
    res.render("index");
});