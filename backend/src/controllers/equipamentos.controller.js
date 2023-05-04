const { PrismaClient } = require("@prisma/client");

require("dotenv").config();

const prisma = new PrismaClient();

const read = async (req, res) => {
  let equips = await prisma.equipamentos.findMany();

  res.status(200).json(equips).end();
};

const create = async (req, res) => {
  let equips = await prisma.equipamentos.create({
    data: req.body
  });
  res.status(201).json(equips);
};

module.exports = {
  read,
  create
};
