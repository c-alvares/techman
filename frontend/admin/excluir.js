const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open");
const closeModalBtn = document.querySelector(".btn-close");
const deleteBtn = document.querySelector(".btn-delete");



// open modal function
const openModal = (params) => {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    deleteBtn.addEventListener("click", () => {
        const options = {
            method: 'DELETE',
            headers: {
              Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('dados')).token
            }
          };
          
          fetch('http://localhost:3000/excluirequipamento/' + params, options)
          .then(response => response.status)
          .then(resp => { if(resp == 200) {
                  // alert("Publicação exclúida com sucesso")
                //   mudar de alert para modal
                  window.location.reload()
              }else {
                  alert("Falha ao excluir publicação")
              }
          })
          .catch(err => console.error(err));
    })
}

// close modal function
const closeModal = () => {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}

// close the modal when the close button and overlay is clicked
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// close modal when the Esc key is pressed
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
})