const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();



const read = async (req, res) => {
  let coments = await prisma.comentarios.findMany({
    orderBy: { data: 'desc' }
  });

  res.status(200).json(coments).end();
};


const readOne = async (req, res) => {
  let coments = await prisma.comentarios.findMany({
    where: { equipamento_id: Number(req.params.equipamento_id) },
    orderBy: { data: 'desc' }
  });

  res.status(200).json(coments).end();
};

const create = async (req, res) => {
  let coments = await prisma.comentarios.create({
    data:req.body
  });
  res.status(200).json(coments).end();
}

module.exports = {
  read,
  readOne,
  create
};

// https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting