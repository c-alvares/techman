const container = document.querySelector(".container");

const options = { method: "GET" };

fetch("http://localhost:3000/equipamentos", options)
  .then((response) => response.json())
  .then((resp) => {
    resp.forEach((card) => {
      let cardEquipamento = container.cloneNode(true);
      cardEquipamento.classList.remove("model");
      cardEquipamento.querySelector('.imagem').src = "../../docs/assets/" + card.imagem
      cardEquipamento.querySelector("h3").innerHTML = card.imagem;
      cardEquipamento.querySelector("p").innerHTML = card.descricao;

      document.querySelector("main").appendChild(cardEquipamento);
      // appendar sempre a um elemento pai da variável definida(<main> <div>)
    });
  })
  .catch((err) => console.error(err));

// id
// equipamento
// imagem
// descricao
// ativo
// data