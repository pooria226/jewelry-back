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
const { authentication } = require("../app/middleware/authentication");

// Start Auth
router.post("/auth/receive", AuthController.receive);
router.post("/auth/login", AuthController.login);
// End Auth

// Start User
router.post("/user/current", authentication, UserController.currentUser);
router.get("/user/profile", authentication, UserController.profile);
router.post("/user/walet", authentication, UserController.walet);
router.get("/user/walet/verify", UserController.verifyWalet);
router.post("/user/profile", authentication, UserController.profileUpdate);
router.post("/user/all", authentication, UserController.all);
router.post("/user", authentication, UserController.store);
router.get("/user/:id", authentication, UserController.show);
router.put("/user/:id", authentication, UserController.update);
router.delete("/user/:id", authentication, UserController.delete);
// End User

// Start Tag
router.get("/tag/all", authentication, TagController.all);
router.get("/tag/:id", authentication, TagController.show);
router.post("/tag", authentication, TagController.store);
router.put("/tag/:id", authentication, TagController.update);
router.delete("/tag/:id", authentication, TagController.delete);
// End Tag

// Start Category
router.get("/category/all", authentication, CategoryController.all);
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
// End Address

// Start Blog
router.get("/blog/all/:page", authentication, BlogController.all);
router.post("/blog", authentication, BlogController.store);
router.get("/blog/:id", authentication, BlogController.show);
router.put("/blog/:id", authentication, BlogController.update);
router.delete("/blog/:id", authentication, BlogController.delete);
// End Blog

// Start Product
router.get("/product/all/:page", authentication, ProductController.all);
router.post("/product", authentication, ProductController.store);
// End Product

// Start Payment
router.get("/payment/all/:page", authentication, PaymentController.all);
// End Payment

// Start Contact
router.get("/contact/all", authentication, ContactController.all);
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

module.exports = router;
