const shopRoute = require('./shop');
const productRoute = require('./products');

function route(app) {
    app.use('/products', productRoute);
    app.use('/', shopRoute);
}

module.exports = route;
