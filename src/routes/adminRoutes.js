const express = require("express");
const AdminController = require("../controllers/AdminController");
const Auth = require("../config/auth");
const authorize = require("../middlewares/authorize");

const router = express.Router();

// Definição das rotas de usuário publicas
router.post("/admin/", AdminController.createAdmin); // Create User Admin/Doctor

module.exports = router;
