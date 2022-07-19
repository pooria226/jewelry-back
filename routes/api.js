const express = require("express");
const router = express.Router();
const AuthController = require("../app/Http/Controller/Auth/AuthController");
const UserController = require("../app/Http/Controller/UserController");
const ContactController = require("../app/Http/Controller/ContactController");
const AboutController = require("../app/Http/Controller/AboutController");
const CategoryController = require("../app/Http/Controller/CategoryController");
const TagController = require("../app/Http/Controller/TagController");
const GalleryController = require("../app/Http/Controller/GalleryController");
const AddressController = require("../app/Http/Controller/AddressController");
const BlogController = require("../app/Http/Controller/BlogController");
const ProductController = require("../app/Http/Controller/ProductController");
const PaymentController = require("../app/Http/Controller/PaymentController");
const SliderController = require("../app/Http/Controller/SliderController");
const FavoriteController = require("../app/Http/Controller/FavoriteController");
const CommentController = require("../app/Http/Controller/CommentController");
const OrderController = require("../app/Http/Controller/OrderController");
const HomeController = require("../app/Http/Controller/website/HomeController");
const WebBlogController = require("../app/Http/Controller/website/BlogController");
const WebProductController = require("../app/Http/Controller/website/ProductController");
const { authentication } = require("../app/middleware/authentication");
const { public } = require("../app/middleware/public");

// Start Auth
router.post("/auth/receive", AuthController.receive);
router.post("/auth/login", AuthController.login);
// End Auth

// Start User
router.post("/user/current", authentication, UserController.currentUser);
router.get("/user/profile", authentication, UserController.profile);

router.post("/user/profile", authentication, UserController.profileUpdate);
router.post("/user/avatar", authentication, UserController.avatarUpdate);
router.post("/user/all/:page", authentication, UserController.all);
router.post("/user", authentication, UserController.store);
router.get("/user/:id", authentication, UserController.show);
router.put("/user/:id", authentication, UserController.update);
router.delete("/user/:id", authentication, UserController.delete);
router.post("/user/search/:page", authentication, UserController.search);
// End User

// Start Order
router.get("/orders/verify", OrderController.verifyOrder);
router.get("/orders/all", authentication, OrderController.ordersAll);
router.get("/orders/pay/:orderId", authentication, OrderController.ordersPay);
// End Order

// Start Tag
router.get("/tag/all/:page", authentication, TagController.all);
router.get("/tag/:id", authentication, TagController.show);
router.post("/tag", authentication, TagController.store);
router.put("/tag/:id", authentication, TagController.update);
router.delete("/tag/:id", authentication, TagController.delete);
// End Tag

// Start Category
router.post("/category/all/:page", authentication, CategoryController.all);
router.get("/category/:id", authentication, CategoryController.show);
router.post("/category", authentication, CategoryController.store);
router.put("/category/:id", authentication, CategoryController.update);
router.delete("/category/:id", authentication, CategoryController.delete);
// End Category

// Start Gallery
router.post("/gallery/all", authentication, GalleryController.all);
router.post("/gallery/file", authentication, GalleryController.storeFile);
router.post("/gallery/folder", authentication, GalleryController.storeFolder);
router.put("/gallery/folder", authentication, GalleryController.updateFolder);
router.delete(
  "/gallery/file/:id",
  authentication,
  GalleryController.deleteFile
);
router.delete(
  "/gallery/folder/:id",
  authentication,
  GalleryController.deleteFolder
);
// End Gallery

// Start Address
router.get("/address/all", authentication, AddressController.all);
router.post("/address", authentication, AddressController.store);
router.get("/address/:id", authentication, AddressController.show);
router.put("/address/:id", authentication, AddressController.update);
router.delete("/address/:id", authentication, AddressController.delete);
router.get(
  "/address/select/:id",
  authentication,
  AddressController.selectAddress
);
// End Address

// Start Blog
router.get("/blog/all/:page", authentication, BlogController.all);
router.get("/blog/category", authentication, BlogController.category);
router.get("/blog/tag", authentication, BlogController.tag);
router.get("/blog/bloger", authentication, BlogController.userBloger);
router.post("/blog/search/:page", authentication, BlogController.search);
router.post("/blog", authentication, BlogController.store);
router.get("/blog/:id", authentication, BlogController.show);
router.put("/blog/:id", authentication, BlogController.update);
router.delete("/blog/:id", authentication, BlogController.delete);
router.get("/blog/publish/:id", authentication, BlogController.publish);
router.get("/blog/unpublish/:id", authentication, BlogController.unPublish);
// End Blog

// Start Product
router.get("/product/all/:page", authentication, ProductController.all);
router.get(
  "/product/correction",
  authentication,
  ProductController.priceCorrecdddtion
);
router.get("/product/:id", authentication, ProductController.show);
router.post("/product", authentication, ProductController.store);
router.put("/product/:id", authentication, ProductController.update);
router.delete("/product/:id", authentication, ProductController.delete);
router.get("/product/publish/:id", authentication, ProductController.publish);
router.post("/product/search/:page", authentication, ProductController.search);
router.get(
  "/product/unpublish/:id",
  authentication,
  ProductController.unPublish
);
// End Product

// Start slider
router.post("/slider/all", authentication, SliderController.all);
router.post("/slider", authentication, SliderController.store);
router.get("/slider/:id", authentication, SliderController.show);
router.put("/slider/:id", authentication, SliderController.update);
router.delete("/slider/:id", authentication, SliderController.delete);
// End slider

// Start Payment
router.get("/payment/all/:page", authentication, PaymentController.all);
// End Payment

// Start Contact
router.get("/contact/all/:page", authentication, ContactController.all);
router.get("/contact/:id", authentication, ContactController.show);
router.post("/contact", ContactController.store);
router.delete("/contact/:id", authentication, ContactController.delete);
// End Contact

// Start about
router.get("/about/team", authentication, AboutController.all);
router.post("/about/team", authentication, AboutController.store);
router.get("/about/team/:id", authentication, AboutController.show);
router.put("/about/team/:id", authentication, AboutController.update);
router.delete("/about/team/:id", authentication, AboutController.delete);
// End about

// Start favorite
router.get("/favorite/all/:page", authentication, FavoriteController.all);
router.get("/favorite/delete/:id", authentication, FavoriteController.delete);
// End favorite

// Start comment
router.get("/comment/all/:page", authentication, CommentController.all);
router.get("/comment/answer/:id", authentication, CommentController.show);
router.post("/comment/answer/:id", authentication, CommentController.answer);
router.get("/comment/:id", authentication, CommentController.publish);
// End comment

//**********************************************************  Start website
// Start home
router.get("/public/home/slider", HomeController.all);
router.get("/public/home/favorite", public, HomeController.favoriteLength);
router.get("/public/home/order", public, HomeController.orderLength);
// end home

// Start about
router.get("/public/about-us/team", AboutController.team);
// end about

// Start Blog
router.get("/public/blog/category", WebBlogController.category);
router.get("/public/blogs/:page", WebBlogController.all);
router.get("/public/blog/new", WebBlogController.news);
router.get("/public/blog/:slug", public, WebBlogController.show);
router.post("/public/blog/search/:page", WebBlogController.search);
router.get("/public/tag", WebBlogController.tag);
router.get("/public/blog/like/:id", authentication, WebBlogController.like);

router.post(
  "/public/blog/comment",
  authentication,
  WebBlogController.addComment
);
// end Blog

// Start Product
router.get("/public/product/new", WebProductController.news);
router.get("/public/product/:slug", public, WebProductController.show);
router.get("/public/product/category", WebProductController.category);
router.get(
  "/public/product/like/:id",
  authentication,
  WebProductController.like
);
router.get(
  "/public/product/favorite/:id",
  authentication,
  WebProductController.favorite
);
router.post("/public/product/search/:page", WebProductController.search);
router.get("/public/product/:page", WebProductController.all);
router.get("/public/product/order/:id", public, WebProductController.order);
// end Product
//********************************************************* End website

module.exports = router;
