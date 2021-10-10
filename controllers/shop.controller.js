exports.getIndex = async (req, res, next) => {
    res.render("index");
};

exports.getProducts = async (req, res, next) => {
    res.render("products");
}