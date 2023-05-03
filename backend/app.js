const express = require("express");
const cors = require("cors");

const usuarios = require("./src/routes/usuarios.routes");
const perfis = require("./src/routes/perfis.routes");
const equipamentos = require("./src/routes/equipamentos.routes");
const comentarios = require("./src/routes/comentarios.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(usuarios);
app.use(perfis);
app.use(equipamentos);
app.use(comentarios);

app.listen(3000, () => {
  console.log("Rodando");
});