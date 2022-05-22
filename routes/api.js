const express = require("express");
const router = express.Router();
const Auth = require("../app/Controller/Auth/AuthController");

//Start Auth
router.post("/auth/receive", Auth.receive);
router.post("/auth/login", Auth.login);
//End Auth

module.exports = router;
