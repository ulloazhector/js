
//              Clase Tarjeta
class Tarjeta{
    constructor(name, tarjeta, number, ccv){
        this.name = name;
        this.tarjeta = tarjeta;
        this.number = number;
        this.ccv = ccv;

    }
}

//              Nodos principales
let addCards = document.getElementById(`addCards`);
let listaDeTarjetas = document.getElementById(`listaDeTarjetas`);
let formNewCard = document.getElementById(`formNewCard`);

addCards.addEventListener(`click`, addCreditCardForm);




//              Event handlers

function addCreditCardForm(){
    // Creo el formulario
    formNewCard.innerHTML = `
        <input placeholder="Títular" id="nombre"><br>
        <input placeholder="Tarjeta" id="tarjeta"><br>
        <input placeholder="Número" id="numero"><br>
        <input placeholder="CCV" id="ccv"><br>
    `;

    // Agrego el botón
    let boton = document.createElement(`button`);
    boton.textContent = `Agregar`;
    boton.setAttribute(`id`, `add`);
    boton.addEventListener(`click`, addCard);
    formNewCard.appendChild(boton);
}



function addCard(){
    let nombre = document.getElementById(`nombre`).value;
    let tarjeta = document.getElementById(`tarjeta`).value;
    let numero = parseInt(document.getElementById(`numero`).value);
    let ccv = parseInt(document.getElementById(`ccv`).value);

    arrayDeTarjetas.push( new Tarjeta(nombre, tarjeta, numero, ccv) );

    // Agrego una tarjeta a la lista, saco el formulario y muestro las tarjetas
    formNewCard.innerHTML = ``;
    mostrarTarjetas();
}



function eliminarTarjeta(e){
    // Accedo al número de la tarjeta a eliminar
    let num = parseInt(e.currentTarget.parentNode.children[2].innerHTML);
    let index = arrayDeTarjetas.map(t => t.number).indexOf(num);
    
    // Elimino la tarjeta de arrayDeTarjetas
    arrayDeTarjetas.splice(index,1);
    mostrarTarjetas();
}



//              Funciones normales
function mostrarTarjetas(){
    listaDeTarjetas.innerHTML = ``;
    
    for (let i = 0; i < arrayDeTarjetas.length; i++) {
        let li = document.createElement(`li`);
        li.setAttribute(`id`, `tarjeta${i}`);

        li.innerHTML = `
            <p class="datos-tarjeta">${arrayDeTarjetas[i].name}</p>
            <p class="datos-tarjeta">${arrayDeTarjetas[i].tarjeta}</p>
            <p class="datos-tarjeta">${arrayDeTarjetas[i].number}</p>
            <button class="quitarTarjeta">x</button>
        `;

        listaDeTarjetas.appendChild(li);
        let vector = document.getElementsByClassName(`quitarTarjeta`);
        vector[i].addEventListener(`click`,eliminarTarjeta);

        
    }
    
}






//              MAIN

const arrayDeTarjetas = [];
arrayDeTarjetas.push( new Tarjeta(`USUARIO LOCAL`, `visa`, 23422342, 574) );
mostrarTarjetas();