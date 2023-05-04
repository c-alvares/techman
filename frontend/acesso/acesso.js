const painel = document.querySelector('#painelDeSenha');
const teclas = painel.querySelector('#tecladoVirtual');


teclas.addEventListener('click', e => {
    if (e.target.matchs('button')) {
        const tecla = e.target
        const action = tecla.dataset.action
        if (action === 'acessar')  {
            console.log('teste')
        }
    }
})