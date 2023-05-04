const { PrismaClient } = require("@prisma/client");

require("dotenv").config();

const prisma = new PrismaClient();

const read = async (req, res) => {
  let equips = await prisma.equipamentos.findMany();

  res.status(200).json(equips).end();
};


const readOne = async (req, res) => {
  let equips = await prisma.equipamentos.findUnique({
    where: { id: Number(req.params.id) },
    select: {
      id: true,
      equipamento: true,
      imagem: true,
      descricao: true,
      ativo: true,
      data: true,
      comentario: {
        select: {
          id: true,
          comentario: true,
          perfil_id: true,
          data: true,
        },
        orderBy: { data: 'desc' }
      },
    },
  });
  res.status(200).json(equips).end();
};


const create = async (req, res) => {
  let equips = await prisma.equipamentos.create({
    data: req.body,
  });
  res.status(201).json(equips);
};

const remove = async (req, res) => {
  await prisma.equipamentos.delete({
    where: {
      id: Number(req.params.id),
    },
  });

  res.status(200).json("Equipamento deletado").end();
};


module.exports = {
  read,
  readOne,
  create,
  remove,
};
