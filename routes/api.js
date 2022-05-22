const express = require("express");
const router = express.Router();
const Auth = require("../app/Controller/Auth/AuthController");

//Start login
router.post("/auth/login", Auth.login);
//End login

module.exports = router;
