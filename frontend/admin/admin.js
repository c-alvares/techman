const container = document.querySelector(".container");

const modalCadastro = document.querySelector(".modalCadastro");
const modalSucesso = document.querySelector(".modalSucesso");

const overlay0 = document.querySelector(".overlay0");

const cadastrarEquipamentoBtn = document.querySelector(".cadastrarBtn");

const closeModalBtn0 = document.querySelector(".btn-close0");
const closeModalBtnS = document.querySelector(".btn-closeS");

const nomeInput = document.querySelector("#nomeInput"); 
const imagemInput = document.querySelector("#imagemInput");
const descricaoInput = document.querySelector("#descricaoInput");
const checkbox = document.querySelector("input[type=checkbox]");

const perfilAdministrador = JSON.parse(localStorage.getItem('dados')).perfil_id

// função para listar os equipamentos
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

// close modal function
const closeModalS = () => {
  modalSucesso.classList.add("hidden0");
  overlay0.classList.add("hidden0");
  window.location.reload();
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

// função para cadastrar novo equipamento
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
      // console.log(response)
      modalCadastro.classList.add("hidden0")
      modalSucesso.classList.remove("hiddenS")
      setTimeout(() => {
        window.location.reload();
      }, 2000)
    })
    .catch(err => console.error(err));
}

// função para habilitar botão de cadastrar apenas se os campos foram todos preenchidos
const habilitarCadastrarBtn = () => {
  if(nomeInput.value && imagemInput.value && descricaoInput.value) {
    cadastrarEquipamentoBtn.disabled = false;
  } else cadastrarEquipamentoBtn.disabled = true;
}

// eventos para verificar se os campos foram preenchidos
nomeInput.addEventListener("input", habilitarCadastrarBtn);
imagemInput.addEventListener("input", habilitarCadastrarBtn);
descricaoInput.addEventListener("input", habilitarCadastrarBtn);

// evento para cadastrar equipamento
cadastrarEquipamentoBtn.addEventListener("click", cadastrarNovoEquipamento)