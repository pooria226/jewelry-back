const express = require("express");
const router = express.Router();
const AuthController = require("../app/Http/Controller/Auth/AuthController");
const UserController = require("../app/Http/Controller/UserController");
const ContactController = require("../app/Http/Controller/ContactController");
const TagController = require("../app/Http/Controller/TagController");
const { authentication } = require("../app/middleware/authentication");

// Start Auth
router.post("/auth/receive", AuthController.receive);
router.post("/auth/login", AuthController.login);
// End Auth

// Start User
router.post("/user/current", authentication, UserController.currentUser);
router.get("/user/profile", authentication, UserController.profile);
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

// Start Contact
router.get("/contact/all", authentication, ContactController.all);
router.get("/contact/:id", authentication, ContactController.show);
router.post("/contact", ContactController.store);
router.delete("/contact/:id", authentication, ContactController.delete);
// End Contact

module.exports = router;
