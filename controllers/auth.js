const bcrypt = require("bcryptjs");
const { response } = require("express");
const { googleVerify } = require("../helpers/google-verify");
const { generarJWT } = require("../helpers/jwt");

const Usuario = require("../models/usuario");

const login = async (req, res = response) => {
	const { email, password } = req.body;
	try {
		// verificar email
		const usuarioDB = await Usuario.findOne({ email });

		if (!usuarioDB) {
			return res.status(404).json({ ok: false, msg: "Email no encontrado" });
		}

		// verificar contraseña
		const validPassword = bcrypt.compareSync(password, usuarioDB.password);
		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				msg: "Contraseña no valida",
			});
		}

		// Generar el token
		const token = await generarJWT(usuarioDB.id);

		res.json({
			ok: true,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ ok: false, msg: "Hable con el admin" });
	}
};

const googleSignIn = async (req, res = response) => {
	const googleToken = req.body.token;

	try {
		const { name, email, picture } = await googleVerify(googleToken);

		const usuarioDB = await Usuario.findOne({ email });
		let usuario;
		// si no existe el usuario
		if (!usuarioDB) {
			usuario = new Usuario({
				nombre: name,
				email,
				password: "@@@",
				img: picture,
				google: true,
			});
		} else {
			// existe usuario
			usuario = usuarioDB;
			usuario.google = true;
		}

		// guardar en DB
		await usuario.save();

		// Generar el token
		const token = await generarJWT(usuario.id);

		res.json({
			ok: true,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(401).json({
			ok: false,
			msg: "Token no es correcto",
		});
	}
};

const renewToken = async (req, res = response) => {
	const uid = req.uid;
	// Generar el token
	const token = await generarJWT(uid);

	// obtener el usuario por UID

	const usuario = await Usuario.findById(uid);

	res.json({
		ok: true,
		token,
		usuario,
	});
};

module.exports = { login, googleSignIn, renewToken };
