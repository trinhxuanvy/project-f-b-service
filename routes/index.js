const shopRoute = require("./shop");
const orderRoute = require("./order");
const adminRoute = require("./admin");
const paymentRoute = require("./payment");
const authRoute = require("./auth");

function route(app) {
  app.use("/order", orderRoute);
  app.use("/", shopRoute);
  app.use(adminRoute);
  app.use(paymentRoute);
  app.use(authRoute);
}

module.exports = route;
