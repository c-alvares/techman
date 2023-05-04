const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


const read = async (req, res) => {
  let profile = await prisma.perfis.findMany();

  res.status(200).json(profile).end();
};
	
module.exports = {
  read,
}