//Obtenemos la referencia a los elementos del DOM
import {grabarDatosLocalStorage,limpiezaDatos,grabarDatosApp} from "./funLocalStorage.js";

const formulario = document.getElementById('formulario');

const seleccionados = document.getElementById("seleccionados")

const delegado = document.getElementById("delegado")
const subdelegado = document.getElementById("subDelegado")
const numVotos = document.getElementById("numVotos")
const grabar = document.getElementById('guardar');
const eliminar = document.getElementById('eliminar');

//Este objeto controlará todo

const control = {
    listaVotados:[],
    votosEmitidos:0,

    aumentaVoto(id){
        this.listaVotados[id].votos++
        this.votosEmitidos++
        numVotos.textContent = this.votosEmitidos
    },
    insertaVotado(nombre)  {
        this.listaVotados.push({
            nombre:nombre,
            votos:0,
        })
        const id = this.listaVotados.length-1;
        
        const elementoListaSeleccionados = document.createElement('div');
        elementoListaSeleccionados
            .innerHTML=`    <p>${nombre}</p>
                            <input type="button" class="boton-modificado" value="0" id="C${id}" data-counter>`                     

        //añadimos el elemento a la lista de elementosdom       
        elementoListaSeleccionados.id=nombre


       seleccionados.append(elementoListaSeleccionados)

        //Asignamos los eventos a los botones
        document.getElementById(`C${id}`).addEventListener("click",(event)=>{  
            if (event.target.dataset.counter != undefined ) {
                this.aumentaVoto(id)
                event.target.value++
                this.dameDelegado()
                formulario["nombre"].focus()
            }
        })
    },  
    reseteaFormulario() {
        formulario['nombre'].value=''
        formulario['nombre'].focus()
    },
    dameDelegado(){
        const nombreDelegado =[...this.listaVotados].sort((ele1, ele2)=>
                    ele2.votos - ele1.votos)
        delegado.textContent=`Delegado: ${nombreDelegado[0].nombre}`
        const divDelegado= document.getElementById(`${nombreDelegado[0].nombre}`)
        seleccionados.insertAdjacentElement('afterbegin', divDelegado)
        if (nombreDelegado.length>1){
            subdelegado.textContent=`SubDelegado: ${nombreDelegado[1].nombre}`
            const divSubDelegado= document.getElementById(`${nombreDelegado[1].nombre}`)
            divDelegado.insertAdjacentElement('afterend', divSubDelegado)

        }
       
    },
}
//El submit
formulario.addEventListener("submit", (event)=> {
    event.preventDefault();
    if ( formulario['nombre'].value !== "") {
        control.insertaVotado(formulario['nombre'].value)          
        control.reseteaFormulario()
             
    };
});

grabarDatosApp(control,seleccionados,numVotos,delegado,subdelegado);
grabar.addEventListener('click', ()=> {
    grabarDatosLocalStorage(control);
});
eliminar.addEventListener('click', ()=> {
    limpiezaDatos(control,seleccionados,numVotos,delegado,subdelegado,true);
});

