const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const { validarJWT } = require("../middlewares/validar-jwt");

const {
	getMedicos,
	crearMedicos,
	actualizarMedico,
	borrarMedico,
} = require("../controllers/medicos");

const router = Router();

//  Ruta : /api/hospitales

router.get("/", getMedicos);
router.post(
	"/",
	[
		validarJWT,
		check("nombre", "El nombre del medico es necesario").not().isEmpty(),
		check("hospital", "El hospital Id debe ser necesario").isMongoId(),
		validarCampos,
	],
	crearMedicos
);
router.put(
	"/:id",
	[
		validarJWT,
		check("nombre", "El nombre del medico es necesario").not().isEmpty(),
		check("hospital", "El hospital Id debe ser necesario").isMongoId(),
		validarCampos,
	],
	actualizarMedico
);
router.delete("/:id", borrarMedico);

module.exports = router;
