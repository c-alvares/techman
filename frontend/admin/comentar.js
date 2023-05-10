const modal1 = document.querySelector(".modal1");
const modal2 = document.querySelector(".modal2");
const overlay1 = document.querySelector(".overlay1");
const overlay2 = document.querySelector(".overlay2");
const closeModalBtn1 = document.querySelector(".btn-close1");
const comentarios = document.querySelector(".comentario");
const commentBtn = document.querySelector(".btn-comment");
const cadastrarBtn = document.querySelector(".btn-cadastrar")
const inputComentario = document.querySelector(".inputComentario");



// open modal function
const verComentarios = (params) => {
    modal1.classList.remove("hidden1");
    overlay1.classList.remove("hidden1");
  
    const options2 = {method: 'GET'};
    fetch('http://localhost:3000/comentariosequipamento/' + params, options2)
      .then(response => response.json())
      .then(resp => {
        resp.forEach((comment) => {
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
            cardComentario.querySelector("h5").innerHTML = comment.data.toLocaleString('pt-BR', { timeZone: 'GMT-3' }).split('T')[0];
            cardComentario.querySelector("p").innerHTML = comment.comentario;
    
            document.querySelector("#secao").appendChild(cardComentario);
        })
    
      })
      .catch(err => console.error(err));    

      commentBtn.addEventListener("click", () => {
        modal2.classList.remove("hidden2");
        overlay2.classList.remove("hidden2");
        modal1.classList.add("hidden1");
        overlay1.classList.remove("hidden1");        
      })

      cadastrarBtn.addEventListener("click", () => {

        let inputBody = {
            comentario: inputComentario.value,
            equipamento_id: params,
            perfil_id: JSON.parse(localStorage.getItem('dados')).perfil_id
        }

        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            
        };
        options.body = JSON.stringify(inputBody);
        
        fetch('http://localhost:3000/comentar', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));        
    })
}

// close modal function
const closeModal1 = () => {
    modal1.classList.add("hidden1");
    overlay1.classList.add("hidden1");
}

// close the modal when the close button and overlay is clicked
closeModalBtn1.addEventListener("click", closeModal1);
overlay1.addEventListener("click", closeModal1);

// close modal when the Esc key is pressed
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal1.classList.contains("hidden1")) {
      closeModal1();
    }
})

