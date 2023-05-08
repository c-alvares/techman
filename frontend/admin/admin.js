// id
// equipamento
// imagem
// descricao
// ativo
// data

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