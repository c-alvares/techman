const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

const prisma = new PrismaClient();



const read = async (req, res) => {
  let coments = await prisma.comentarios.findMany();

  res.status(200).json(coments).end();
};
	
module.exports = {
  read,
};