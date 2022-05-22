const express = require("express");
const router = express.Router();
const AuthController = require("../app/Http/Controller/Auth/AuthController");
const UserController = require("../app/Http/Controller/UserController");
const ContactController = require("../app/Http/Controller/ContactController");
const { authentication } = require("../app/middleware/authentication");

// Start Auth
router.post("/auth/receive", AuthController.receive);
router.post("/auth/login", AuthController.login);
// End Auth

// Start User
router.post("/user/current", authentication, UserController.currentUser);
router.post("/user/all", authentication, UserController.all);
// End User

// Start Contact
router.post("/contact", ContactController.store);
// End Contact

module.exports = router;
