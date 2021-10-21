const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const mongooes = require('mongoose');
const dotenv = require('dotenv');
const shopRoute = require('./routes/shop.route.js');

dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(shopRoute);

const port = process.env.PORT || 3000;

// mongooes.connect(
//     process.env.CONNECT_DATABASE,
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     }
// ).then(() => {
//     console.log("Connected to database");

// }).catch(() => {
//     console.log("Can't connect to database");
// });
app.listen(port, () => {
    console.log('Listening at port ' + port);
});
