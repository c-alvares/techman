const container = document.querySelector(".container");

const modalCadastro = document.querySelector(".modalCadastro");
const overlay0 = document.querySelector(".overlay0");

const closeModalBtn0 = document.querySelector(".btn-close0")

const nomeInput = document.querySelector("#nomeInput"); 
const imagemInput = document.querySelector("#imagemInput");
const descricaoInput = document.querySelector("#descricaoInput");
const checkbox = document.querySelector("input[type=checkbox]");
// const isChecked = checkbox.checked;

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
        cardEquipamento.innerHTML += `<img src="../../docs/assets/deletar.png" onclick="openModal(${card.id})">`;
        cardEquipamento.innerHTML += `<hr>`;
        document.querySelector("main").appendChild(cardEquipamento);
        // appendar sempre a um elemento pai da variável definida(<main> <div>)
      }
    });
  })
  .catch((err) => console.error(err));

// open modal function
const popupCadastro = () => {
  modalCadastro.classList.remove("hidden0");
  overlay0.classList.remove("hidden0");
}

// close modal function
const closeModal0 = () => {
  modalCadastro.classList.add("hidden0");
  overlay0.classList.add("hidden0");
}

// close the modal when the close button and overlay is clicked
closeModalBtn0.addEventListener("click", closeModal0);
overlay0.addEventListener("click", closeModal0);

// close modal when the Esc key is pressed
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modalCadastro.classList.contains("hidden0")) {
    closeModal0();
  }
});

const cadastrarNovoEquipamento = () => {

  const send = {
  equipamento: nomeInput.value,
  imagem: imagemInput.value,
  descricao: descricaoInput.value,
  ativo: checkbox.checked
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('dados')).token
    },
  };
  options.body = JSON.stringify(send);
  
  fetch('http://localhost:3000/cadastrarequipamento', options)
    .then(response => response.json())
    .then(response => {
      console.log(response)
      window.location.reload();
    })
    .catch(err => console.error(err));
}
