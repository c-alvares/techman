const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const prisma = new PrismaClient();

const read = async (req, res) => {
	let users = await prisma.usuarios.findMany();

	res.status(200).json(users).end();
};

const login = async (req, res) => {
	const user = await prisma.usuarios.findMany({
		where: {
			senha: req.body.senha,
		},
		select: {
			id: true,
			perfil_id: true,
		},
	});
	if (user.length > 0) {
		jwt.sign(user[0], process.env.KEY, { expiresIn: "30m" }, function (err, token) {
				if (err == null) {
					user[0]["token"] = token;
					res.status(200).json(user[0]).end();
				} else {
					res.status(401).json(err).end();
				}
		});
	} else {
		res.status(401).json("Erro na tentativa de acesso").end();
	}
};

module.exports = {
	read,
	login,
};
