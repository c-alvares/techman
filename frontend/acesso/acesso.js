const inputSenha = document.getElementById("inputSenha");
const botoesTeclado = document.querySelectorAll("#tecladoVirtual button");
const btnTeclaEnter = document.querySelector(".teclaEnter");

const limparSenha = () => {
  inputSenha.value = "";
//   habilitarTeclaEnter();
};

const adicionarNumeroSenha = (valor) => {
  inputSenha.value += valor;
  habilitarTeclaEnter();
};

const habilitarTeclaEnter = () => {
  btnTeclaEnter.disabled = inputSenha.value.length !== 6;
};

botoesTeclado.forEach((botao) => {
  const valor = botao.textContent;
  if (valor === "C") {
    botao.addEventListener("click", limparSenha);
  } else {
    botao.addEventListener("click", () => adicionarNumeroSenha(valor));
  }
});

// btnTeclaEnter.addEventListener("click", () => {
//   if (inputSenha.value.length !== 6) {
//     alert("ERRO: Senha incorreta.");
//     limparSenha();
//   } else {
//     acessarSistema();
//   }
// });

const acessarSistema = () => {
  const senha = inputSenha.value;
  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ senha }),
  })
    .then((response) => {
      if (response.status === 401) {
        alert("ERRO: Senha incorreta.");
        limparSenha();
      } else {
        return response.json();
      }
    })
    .then((response) => {
        if ( response.perfil_id !== 2) window.location.href = '../home/home.html';
        else {
          window.location.href = '../admin/admin.html';
          localStorage.setItem('dados', JSON.stringify(response))
        }
    })
    .catch((err) => console.error(err));
};
