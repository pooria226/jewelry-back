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
const InstructionController = require("../app/Http/Controller/InstructionController");
const OrderController = require("../app/Http/Controller/OrderController");
const DashboardController = require("../app/Http/Controller/DashboardController");
const FaqController = require("../app/Http/Controller/FaqController");
const HomeController = require("../app/Http/Controller/website/HomeController");
const WebBlogController = require("../app/Http/Controller/website/BlogController");
const WebProductController = require("../app/Http/Controller/website/ProductController");
const { authentication } = require("../app/middleware/authentication");
const { isUser } = require("../app/middleware/isUser");
const { isAdmin } = require("../app/middleware/isAdmin");
const { isBloger } = require("../app/middleware/isBloger");
const { public } = require("../app/middleware/public");

// Start Auth
router.post("/auth/receive", AuthController.receive);
router.post("/auth/login", AuthController.login);
// End Auth

// Start Dashboard
router.get(
  "/dashboard/order",
  authentication,
  isUser,
  DashboardController.orders
);
router.get(
  "/dashboard/counter",
  authentication,
  isAdmin,
  DashboardController.counter
);
// End Dashboard

// Start User
router.post("/user/current", authentication, UserController.currentUser);
router.get("/user/profile", authentication, UserController.profile);
router.post("/user/profile", authentication, UserController.profileUpdate);
router.post("/user/avatar", authentication, UserController.avatarUpdate);
router.post("/user/all/:page", authentication, isAdmin, UserController.all);
router.post("/user", authentication, isAdmin, UserController.store);
router.get("/user/:id", authentication, isAdmin, UserController.show);
router.put("/user/:id", authentication, isAdmin, UserController.update);
router.delete("/user/:id", authentication, isAdmin, UserController.delete);
router.post(
  "/user/search/:page",
  authentication,
  isAdmin,
  UserController.search
);
// End User

// Start Faq
router.get("/faq/all/:page", authentication, isBloger, FaqController.all);
router.post("/faq", authentication, isBloger, FaqController.store);
router.get("/faq/:id", authentication, isBloger, FaqController.show);
router.put("/faq/:id", authentication, isBloger, FaqController.update);
router.delete("/faq/:id", authentication, isAdmin, FaqController.delete);
// End Faq

// Start Order
router.get("/orders/verify", OrderController.verifyOrder);
router.get("/orders/all", authentication, isUser, OrderController.ordersAll);
router.get(
  "/orders/pay/:orderId",
  authentication,
  isUser,
  OrderController.ordersPay
);
// End Order

// Start Tag
router.get("/tag/all/:page", authentication, isBloger, TagController.all);
router.get("/tag/:id", authentication, isBloger, TagController.show);
router.post("/tag", authentication, isBloger, TagController.store);
router.put("/tag/:id", authentication, isBloger, TagController.update);
router.delete("/tag/:id", authentication, isAdmin, TagController.delete);
// End Tag

// Start Category
router.post(
  "/category/all/:page",
  authentication,
  isBloger,
  CategoryController.all
);
router.get("/category/:id", authentication, isBloger, CategoryController.show);
router.post("/category", authentication, isBloger, CategoryController.store);
router.put(
  "/category/:id",
  authentication,
  isBloger,
  CategoryController.update
);
router.delete(
  "/category/:id",
  isAdmin,
  authentication,
  CategoryController.delete
);
// End Category

// Start Gallery
router.post("/gallery/all", authentication, isBloger, GalleryController.all);
router.post(
  "/gallery/file",
  authentication,
  isBloger,
  GalleryController.storeFile
);
router.post(
  "/gallery/folder",
  isBloger,
  authentication,
  GalleryController.storeFolder
);
router.put(
  "/gallery/folder",
  authentication,
  isBloger,
  GalleryController.updateFolder
);
router.delete(
  "/gallery/file/:id",
  authentication,
  isAdmin,
  GalleryController.deleteFile
);
router.delete(
  "/gallery/folder/:id",
  authentication,
  isAdmin,
  GalleryController.deleteFolder
);
// End Gallery

// Start Address
router.get("/address/all", authentication, isUser, AddressController.all);
router.post("/address", authentication, isUser, AddressController.store);
router.get("/address/:id", authentication, isUser, AddressController.show);
router.put("/address/:id", authentication, isUser, AddressController.update);
router.delete("/address/:id", authentication, isUser, AddressController.delete);
router.get(
  "/address/select/:id",
  authentication,
  isUser,
  AddressController.selectAddress
);
// End Address

// Start Blog
router.get("/blog/all/:page", authentication, isBloger, BlogController.all);
router.get("/blog/category", authentication, isBloger, BlogController.category);
router.get("/blog/tag", authentication, isBloger, BlogController.tag);
router.get("/blog/bloger", authentication, isBloger, BlogController.userBloger);
router.post(
  "/blog/search/:page",
  isBloger,
  authentication,
  BlogController.search
);
router.post("/blog", authentication, isBloger, BlogController.store);
router.get("/blog/:id", authentication, isBloger, BlogController.show);
router.put("/blog/:id", authentication, isBloger, BlogController.update);
router.delete("/blog/:id", authentication, isAdmin, BlogController.delete);
router.get(
  "/blog/publish/:id",
  authentication,
  isAdmin,
  BlogController.publish
);
router.get(
  "/blog/unpublish/:id",
  authentication,
  isAdmin,
  BlogController.unPublish
);
// End Blog

// Start Product
router.get(
  "/product/category",
  authentication,
  isBloger,
  ProductController.category
);
router.get(
  "/product/all/:page",
  authentication,
  isBloger,
  ProductController.all
);
router.get(
  "/product/correction",
  authentication,
  isBloger,
  ProductController.priceCorrecdddtion
);
router.get("/product/:id", authentication, isBloger, ProductController.show);
router.post("/product", authentication, isBloger, ProductController.store);
router.put("/product/:id", authentication, isBloger, ProductController.update);
router.delete(
  "/product/:id",
  authentication,
  isAdmin,
  ProductController.delete
);
router.get(
  "/product/publish/:id",
  authentication,
  isAdmin,
  ProductController.publish
);
router.post(
  "/product/search/:page",
  authentication,
  isBloger,
  ProductController.search
);
router.get(
  "/product/unpublish/:id",
  authentication,
  isAdmin,
  ProductController.unPublish
);
// End Product

// Start slider
router.post("/slider/all", authentication, isBloger, SliderController.all);
router.post("/slider", authentication, isBloger, SliderController.store);
router.get("/slider/:id", authentication, isBloger, SliderController.show);
router.put("/slider/:id", authentication, isBloger, SliderController.update);
router.delete("/slider/:id", authentication, isAdmin, SliderController.delete);
// End slider

// Start Payment
router.get("/payment/all/:page", authentication, PaymentController.all);
// End Payment

// Start Contact
router.get(
  "/contact/all/:page",
  authentication,
  isAdmin,
  ContactController.all
);
router.get("/contact/:id", authentication, isAdmin, ContactController.show);
router.post("/contact", ContactController.store);
router.delete(
  "/contact/:id",
  authentication,
  isAdmin,
  ContactController.delete
);
// End Contact

// Start about
router.get("/about/team", authentication, isAdmin, AboutController.all);
router.post("/about/team", authentication, isAdmin, AboutController.store);
router.get("/about/team/:id", authentication, isAdmin, AboutController.show);
router.put("/about/team/:id", authentication, isAdmin, AboutController.update);
router.delete(
  "/about/team/:id",
  authentication,
  isAdmin,
  AboutController.delete
);
// End about

// Start favorite
router.get(
  "/favorite/all/:page",
  authentication,
  isUser,
  FavoriteController.all
);
router.get(
  "/favorite/delete/:id",
  authentication,
  isUser,
  FavoriteController.delete
);
// End favorite

// Start comment
router.get(
  "/comment/all/:page",
  authentication,
  isBloger,
  CommentController.all
);
router.get(
  "/comment/answer/:id",
  authentication,
  isBloger,
  CommentController.show
);
router.post(
  "/comment/answer/:id",
  authentication,
  isBloger,
  CommentController.answer
);
router.get("/comment/:id", authentication, isBloger, CommentController.publish);
router.delete(
  "/comment/:id",
  authentication,
  isBloger,
  CommentController.delete
);
// End comment

// Start Instruction
router.post(
  "/instruction/all/:page",
  authentication,
  isAdmin,
  InstructionController.ordersAll
);
router.get(
  "/instruction/show/:id",
  authentication,
  isAdmin,
  InstructionController.show
);
router.post(
  "/instruction/show/:id",
  authentication,
  isAdmin,
  InstructionController.delivery
);
// End Instruction

//**********************************************************  Start website
// Start home
router.get("/public/home/slider", HomeController.all);
router.get("/public/home/favorite", public, HomeController.favoriteLength);
router.get("/public/home/order", public, HomeController.orderLength);
router.get("/public/home/faq", public, HomeController.faq);
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
router.get(
  "/public/product/order/:id",
  authentication,
  WebProductController.order
);
router.post(
  "/public/product/comment",
  authentication,
  WebProductController.addComment
);
// end Product
//********************************************************* End website

module.exports = router;
