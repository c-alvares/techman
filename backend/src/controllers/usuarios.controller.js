const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
    jwt.sign(
      user,
      process.env.KEY,
      { expiresIn: "30m" },
      function (err, token) {
        if (err == null) {
          user["token"] = token;
          res.status(200).json(user).end();
        } else {
          res.status(404).json(err).end();
        }
      }
    );
  } else {
    res.status(404).json("Erro na tentativa de acesso").end();
  }
};

module.exports = {
  read,
  login,
};
