const Product = require("../models/Product");
const Category = require("../models/Category");

const ITEM_PAGE = 4;

exports.getProduct = async (req, res, next) => {
  const page = 1;
  let search = req.query.search || "";
  let products = [];

  if (search) {
    products = await Product.find({
      prodName: { $regex: search, $options: "i" },
    });

    search = "?search=" + search;
  } else {
    products = await Product.find();
  }

  const getPage = Math.floor(products.length / ITEM_PAGE);
  const totalPage = products.length % ITEM_PAGE != 0 ? getPage + 1 : getPage;
  const nextPage = parseInt(page) + 1;
  const prevPage = parseInt(page) - 1;
  const categories = await Category.find();
  const numPage = products.length ? page : 0;
  products = products.slice((page - 1) * ITEM_PAGE, page * ITEM_PAGE);

  res.render("admin/products", {
    pageName: "products",
    products,
    categories,
    page,
    numPage,
    nextPage,
    prevPage,
    totalPage,
    search,
  });
};

exports.getCategory = async (req, res, next) => {
  res.render("admin/category", { pageName: "category" });
};

exports.getUser = async (req, res, next) => {
  res.render("admin/users", { pageName: "user" });
};

exports.getProfile = async (req, res, next) => {
  res.render("admin/profile", { pageName: "profile" });
};
