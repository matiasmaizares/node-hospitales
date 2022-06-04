const fs = require("fs");
const Usuario = require("../models/usuario");
const Medico = require("../models/medico");
const Hospital = require("../models/hospital");

const borrarImagen = (path) => {
	if (fs.existsSync(path)) {
		// borrar la imagen anterior
		fs.unlinkSync(path);
	}
};

const actualizarImagen = async (tipo, id, nombreArchivo) => {
	switch (tipo) {
		case "medicos": {
			const medico = await Medico.findById(id);
			if (!medico) {
				console.log("no es un medico por id");
				return false;
			}
			const pathViejo = `./uploads/medicos/${medico.img}`;
			borrarImagen(pathViejo);
			medico.img = nombreArchivo;
			await medico.save();
			return true;
		}
		case "hospitales": {
			const hospital = await Hospital.findById(id);
			if (!hospital) {
				console.log("no es un hospital por id");
				return false;
			}
			const pathViejo = `./uploads/hospitales/${hospital.img}`;
			borrarImagen(pathViejo);
			hospital.img = nombreArchivo;
			await hospital.save();
			return true;
		}
		case "usuarios": {
			const usuario = await Usuario.findById(id);
			if (!usuario) {
				console.log("no es un usuario por id");
				return false;
			}
			const pathViejo = `./uploads/usuarios/${usuario.img}`;
			borrarImagen(pathViejo);
			usuario.img = nombreArchivo;
			await usuario.save();
			return true;
		}
		default:
	}
};

module.exports = { actualizarImagen };
