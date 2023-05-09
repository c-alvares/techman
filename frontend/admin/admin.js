const container = document.querySelector(".container");

const perfilAdministrador = JSON.parse(localStorage.getItem('dados')).perfil_id


const options = { method: "GET" };
fetch("http://localhost:3000/equipamentos", options)
  .then((response) => response.json())
  .then((resp) => {
    resp.forEach((card) => {
      if (card.ativo !== false) {
        let cardEquipamento = container.cloneNode(true);
        cardEquipamento.classList.remove("model");
        cardEquipamento.querySelector('.imagem').src = "../../docs/assets/" + card.imagem;
        cardEquipamento.querySelector("h3").innerHTML = card.imagem;
        cardEquipamento.querySelector("p").innerHTML = card.descricao;
        cardEquipamento.innerHTML += `<img src="../../docs/assets/comentario.png" onclick="verComentarios(${card.id})">`;
        if ( perfilAdministrador === 2 ) {
          cardEquipamento.innerHTML += `<img src="../../docs/assets/deletar.png" onclick="excluir(${card.id})">`;
        }
        cardEquipamento.innerHTML += `<hr>`;
        document.querySelector("main").appendChild(cardEquipamento);
        // appendar sempre a um elemento pai da variável definida(<main> <div>)
      }
    });
  })
  .catch((err) => console.error(err));


const excluir = (params) => {
    const options = {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('dados')).token
        }
      };
      
      fetch('http://localhost:3000/excluirequipamento/' + params, options)
      .then(response => response.status)
      .then(resp => { if(resp == 200) {
              alert("Publicação exclúida com sucesso")
            //   mudar de alert para modal
              window.location.reload()
          }else {
              alert("Falha ao excluir publicação")
          }
      })
      .catch(err => console.error(err));
}

// id
// equipamento
// imagem
// descricao
// ativo
// data