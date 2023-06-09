const modal1 = document.querySelector(".modal1");
const modal2 = document.querySelector(".modal2");
const modalComentS = document.querySelector(".modalComentS");

const overlay1 = document.querySelector(".overlay1");

const closeModalBtn1 = document.querySelector(".btn-close1");
const closeModalBtn2 = document.querySelector(".btn-close2");
const closeModalBtnCS = document.querySelector(".btn-closeCS");

const comentarios = document.querySelector(".comentario");
const commentBtn = document.querySelector(".btn-comment");

const cadastrarBtn = document.querySelector(".btn-cadastrar");
const inputComentario = document.querySelector(".inputComentario");

// open modal function
const verComentarios = (params) => {
  modal1.classList.remove("hidden1");
  overlay1.classList.remove("hidden1");
  modal1.innerHTML = `
  <button class="btn-close1">⨉</button>
        <h3>Comentários</h3>
        <div class="comentario modalC">
            <h4></h4>
            <h5></h5>
            <p></p>
        </div>
        <button class="btn btn-comment">Adicionar comentário</button>`
  const options2 = { method: "GET" };
  fetch("http://localhost:3000/comentariosequipamento/" + params, options2)
    .then( response => {
      return response.json();
    })
    .then( resp => {
      resp.forEach( comment => {
        let perfil;
        switch (comment.perfil_id) {
          case 1:
            perfil = "Comum";
            break;
          case 2:
            perfil = "Administrador";
            break;
          case 3:
            perfil = "Técnico";
            break;
          case 4:
            perfil = "Gerente";
            break;
        }
        let cardComentario = comentarios.cloneNode(true);
        cardComentario.classList.remove("modalC");
        cardComentario.querySelector("h4").innerHTML = perfil;
        cardComentario.querySelector("h5").innerHTML = comment.data.toLocaleString("pt-BR", { timeZone:"GMT-3" }).split("T")[0];
        cardComentario.querySelector("p").innerHTML = comment.comentario;

        document.querySelector("#secao").appendChild(cardComentario);
      });
    })
    .catch( err => {
      console.error(err);
    });

  //  Eventos para transição do modal de listagem de comentário para o de cadastro 
  commentBtn.addEventListener("click", () => {
    modal1.classList.add("hidden1");
    comentarios.classList.add("modalC");

    modal2.classList.remove("hidden2");
  });


  cadastrarBtn.addEventListener("click", () => {
    let inputBody = {
      comentario: inputComentario.value,
      equipamento_id: params,
      perfil_id: JSON.parse(localStorage.getItem("dados")).perfil_id,
    };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputBody),
    };

    fetch("http://localhost:3000/comentar", options)
      .then( response => {
        return response.json();
      })
      .then( response => {
        modal2.classList.add("hidden2");
        modalComentS.classList.remove("hiddenCS")
        setTimeout(() => {
          window.location.reload();
        }, 2000)        
      })
      .catch( err => {
        console.error(err);
      });
  });
}

const habilitarComentBtn = () => {
  if(inputComentario.value ) {
    cadastrarBtn.disabled = false;
  } else cadastrarBtn.disabled = true;
}

inputComentario.addEventListener("input", habilitarComentBtn);

// close modal function
function closeModal1() {
  modal1.classList.add("hidden1");
  overlay1.classList.add("hidden1");
}

function closeModal2() {
  modal2.classList.add("hidden2");
  overlay1.classList.add("hidden1");
}

function closeModal3() {
  modalComentS.classList.add("hiddenCS");
  overlay1.classList.add("hidden1");
}

// close the modal when the close button or overlay is clicked
closeModalBtn1.addEventListener("click", closeModal1);
overlay1.addEventListener("click", closeModal1);

closeModalBtn2.addEventListener("click", closeModal2);
overlay1.addEventListener("click", closeModal2);

closeModalBtnCS.addEventListener("click", closeModal3);
overlay1.addEventListener("click", closeModal3);


// close modal when the Esc key is pressed
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal1.classList.contains("hidden1")) {
    closeModal1();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal2.classList.contains("hidden2")) {
    closeModal2();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modalComentS.classList.contains("hidden2")) {
    closeModal3();
  }
});
