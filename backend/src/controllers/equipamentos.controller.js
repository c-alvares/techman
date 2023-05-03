const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

const prisma = new PrismaClient();

const read = async (req, res) => {
  let equips = await prisma.equipamentos.findMany();

  res.status(200).json(equips).end();
};

const create = async (req, res) => {
  let { equipamento, imagem, descricao, ativo } = req.body;
  let equips = await prisma.equipamentos.create({
    data: {
      equipamento: equipamento,
      imagem: imagem,
      descricao: descricao,
      ativo: ativo,
    },
  });
  res.status(201).json(equips);
};

module.exports = {
  read,
  create
};
