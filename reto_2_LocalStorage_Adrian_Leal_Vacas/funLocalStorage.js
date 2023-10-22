const grabarDatosLocalStorage = (control) => {

    localStorage.setItem('votados',control.listaVotados.map(el=> JSON.stringify(el)).join(';'));
};
const limpiezaDatos = (control,seleccionados,numVotos,delegado,subdelegado,sipStorage=false) => {
    if (sipStorage) {
        localStorage.clear();
    }
    control.listaVotados = [];
    seleccionados.innerHTML = '';
    control.votosEmitidos = 0;
    numVotos.textContent = 0;
    delegado.textContent = '';
    subdelegado.textContent = '';
};
const grabarDatosApp = (control,seleccionadosB,numVotos,delegadoB,subdelegadoB) => {
    if (localStorage.getItem('votados') !=null) {
        limpiezaDatos(control,seleccionadosB,numVotos,delegadoB,subdelegadoB);
        const participantes = localStorage.getItem('votados').split(';').map(el=> JSON.parse(el))
        participantes.forEach(par => {
            control.listaVotados.push(par);
            control.votosEmitidos += par.votos;
            control.insertaVotado(par.nombre);
            control.dameDelegado();
            const votos = document.getElementById(par.nombre);
            votos.querySelector("input").value = par.votos;
        });
        numVotos.textContent = control.votosEmitidos;
    };
};

export {grabarDatosLocalStorage,limpiezaDatos,grabarDatosApp};