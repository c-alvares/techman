const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();



const read = async (req, res) => {
  let coments = await prisma.comentarios.findMany({
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
  create
};

// https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting