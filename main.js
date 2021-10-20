
// Valores de CFT
const CFT3  = .35;
const CFT6  = .48;
const CFT9  = .87;
const CFT12 = 1.13;
const CFT18 = 2.01;



// Definicion de funciones
function solicitarPrestamo(){
    return parseInt(prompt("Ingresar valor del prestamo"));
}

function calculoCuotas(){
    switch (cuotasCant) {
        case 3: return (prestamo + prestamo*CFT3)/3;
        case 6: return (prestamo + prestamo*CFT6)/6;
        case 9: return (prestamo + prestamo*CFT9)/9;
        case 12: return (prestamo + prestamo*CFT12)/12;
        default: return (prestamo + prestamo*CFT18)/18;
    }
}

function mostrar(valor, cant){
    alert("En total vas a pagar " + cant + " cuotas de $" + valor.toFixed(3) + " cada una.\nTOTAL a pagar $" + cant*valor);
}
     


// Main
let cantOk;
let prestamo = solicitarPrestamo();
do{
    cuotasCant = parseInt(prompt("Cantidad de cuotas: 3 / 6 / 9 / 12 / 18"));
    cantOk = (cuotasCant == 3) || (cuotasCant == 6) ||
             (cuotasCant == 9) || (cuotasCant == 12) ||
             (cuotasCant == 18);
}while(!cantOk);

let valorCuota = calculoCuotas(cuotasCant);
mostrar(valorCuota, cuotasCant);