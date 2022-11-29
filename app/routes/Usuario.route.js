const Usuario = require("../controllers/Usuario.controller");
var router = require("express").Router();
router.get("/",Usuario.get);
router.get("/id/:id",Usuario.getFromId);
router.post("/register",Usuario.register);
router.post("/login",Usuario.login);
module.exports = router;