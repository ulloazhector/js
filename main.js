
// Valores de CFT
// const CFT3  = .35;
// const CFT6  = .48;
// const CFT9  = .87;
// const CFT12 = 1.13;
// const CFT18 = 2.01;



// // Definicion de funciones
// function solicitarPrestamo(){
//     return parseInt(prompt("Ingresar valor del prestamo"));
// }

// function calculoCuotas(){
//     switch (cuotasCant) {
//         case 3: return (prestamo + prestamo*CFT3)/3;
//         case 6: return (prestamo + prestamo*CFT6)/6;
//         case 9: return (prestamo + prestamo*CFT9)/9;
//         case 12: return (prestamo + prestamo*CFT12)/12;
//         default: return (prestamo + prestamo*CFT18)/18;
//     }
// }

// function mostrar(valor, cant){
//     alert("En total vas a pagar " + cant + " cuotas de $" + valor.toFixed(3) + " cada una.\nTOTAL a pagar $" + cant*valor);
// }
     


// // Main
// let cantOk;
// let prestamo = solicitarPrestamo();
// do{
//     cuotasCant = parseInt(prompt("Cantidad de cuotas: 3 / 6 / 9 / 12 / 18"));
//     cantOk = (cuotasCant == 3) || (cuotasCant == 6) ||
//              (cuotasCant == 9) || (cuotasCant == 12) ||
//              (cuotasCant == 18);
// }while(!cantOk);

// let valorCuota = calculoCuotas(cuotasCant);
// mostrar(valorCuota, cuotasCant);



// Objeto
class Wallet{

    constructor(user){
        this.usuario = user;
        this.saldo = 0;
    }

    ingresar(valor){
        this.saldo += valor;
        alert(`Ingresaste $${valor} a tu cuenta`);
    }

    transferir(cuenta, valor){

        if(this.saldo >= valor){
            this.saldo -= valor;
            alert(`Transferiste $${valor} a la cuenta ${cuenta}`);
        } 
        else
            alert(`Saldo insuficiente`);
    }

    consultarInfo(){
        alert(`Usuario: ${this.usuario}\nSaldo actual: $${this.saldo}`);
    }
}




// Creo una sola billetera
const myWallet = new Wallet(prompt("Ingresar usuario de la billetera"));
let alias, amount, option;


// Menú principal
do {
    option = parseInt(prompt("OPCIONES\n(1) Ingresar dinero\n(2) Transferir dinero\n(3) Consultar información"));

    switch (option) {
        case 1:
            amount = parseFloat(prompt("Monto a ingresar"));
            myWallet.ingresar(amount);
            break;

        case 2:
            alias = prompt("Alias de la cuenta destino");
            amount = parseFloat(prompt("Monto a transferir"));
            myWallet.transferir(alias, amount);
            break;

        case 3:
            myWallet.consultarInfo();
            break;

        default:
            alert("Adios!");
            break;
    }
} while (option > 0 && option < 4);
