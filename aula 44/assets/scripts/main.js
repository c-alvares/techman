//Capturar evento do submit do formulário
const form = document.querySelector(".form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  
  // É possível utilizar tanto form, document ou e.target no caso abaixo
  const inputPeso = e.target.querySelector("#peso");
  const inputAltura = form.querySelector("#altura");

  const peso = Number(inputPeso.value);
  const altura = Number(inputAltura.value);

  // Se o peso for verdadeiro, retorna falso, se for falso, retorna verdadeiro
  if (!peso) {
    setResultado("Peso inválido", false);
    return; // Inserido para parar a função caso o peso seja inválido, do contrário, ela segue.
  }

  if (!altura) {
    setResultado("Altura inválida", false);
    return;
  }

  const imc = getImc(peso, altura);
  const nivelImc = getNivelImc(imc);

  const msg = `Seu IMC é ${imc} (${nivelImc}).`;

  setResultado(msg, true);
});

function getNivelImc(imc) {
  const nivel = [
    "Abaixo do peso",
    "Peso normal",
    "Sobrepeso",
    "Obesidade grau 1",
    "Obesidade grau 2",
    "Obesidade grau 3"
  ];

  if (imc >= 39.9) return nivel[5];
  if (imc >= 34.9) return nivel[4];
  if (imc >= 29.9) return nivel[3];
  if (imc >= 24.9) return nivel[2];
  if (imc >= 18.5) return nivel[1];
  if (imc < 18.5) return nivel[0];
}

function getImc(peso, altura) {
  const imc = peso / Math.pow(altura, 2);
  return imc.toFixed(2);
}

function criaPTag() {
  const tagP = document.createElement("p");
  return tagP;
}

function setResultado(msg, isValid) {
  const resultado = document.querySelector("#resultadoImc");
  resultado.innerHTML = "";

  const tagP = criaPTag();

  if (isValid) {
    tagP.classList.add("paragrafo-resultado");
  } else {
    tagP.classList.add("bad");
  }
  tagP.innerHTML = msg;
  resultado.appendChild(tagP);
}
