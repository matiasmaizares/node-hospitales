const { Router } = require("express");
const { check } = require("express-validator");
const { getTodo, getDocumentosColeccion } = require("../controllers/busquedas");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

// Ruta api/todo/:busqueda

router.get("/:busqueda", [validarJWT], getTodo);
router.get("/coleccion/:tabla/:busqueda", [validarJWT], getDocumentosColeccion);

module.exports = router;
