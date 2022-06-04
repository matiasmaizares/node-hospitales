const { Router } = require("express");
const { check } = require("express-validator");

const { login, googleSignIn, renewToken } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();
// RUTA /api/login

router.post(
	"/",
	[
		check("password", "La contraseña es obligatorio").not().isEmpty(),
		check("email", "El email es obligatorio").isEmail(),
		validarCampos,
	],
	login
);
router.post(
	"/google",
	[
		check("token", "El token de google es obligatorio").not().isEmpty(),
		validarCampos,
	],
	googleSignIn
);
router.get("/renew", validarJWT, renewToken);

module.exports = router;
