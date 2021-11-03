
// Declaración de clases
// Transferencia
class Transferencia {

    constructor(rec, amount, fecha) {
        this.rec    = rec;          // true: dinero recibido, false: dinero enviado
        this.amount = amount;
        this.fecha  = fecha         // En formato de entero
    }

    info(){
                                    // Hago referencia a la lista creada en consultarInfo()
        let nodoLista = document.getElementById("listaTransferencias");
        let li = document.createElement("li");
        
        const sign = this.rec ? "+" : "-";
        li.innerHTML = `<li>${sign} $${this.amount}\n  Fecha: ${this.fecha}</li>`;
        nodoLista.appendChild(li);  // Agrego ítem a la lista
    }
}




// Billetera
class Wallet{
    constructor(user){
        this.usuario     = user;
        this.saldo       = 0;
        this.n           = 0;       // Cantidad de transferencias
        this.arrayTransf = [];      // Array de objetos transferencias
    }
    
    ingresar(valor, fecha){
        if(valor >= 0){
            this.saldo += valor;
            this.arrayTransf.push( new Transferencia(true, valor, fecha) );
            this.n++;

            alert(`Ingresaste $${valor} a tu cuenta.`);
        } else
        alert(`Valor incorrecto!`);
    }
    
    pagar(valor, fecha){
        if(this.saldo >= valor){
            this.saldo -= valor;
            this.arrayTransf.push( new Transferencia(false, valor, fecha) );
            this.n++;

            alert(`Pagaste $${valor}.`);
        } 
        else
        alert(`Saldo insuficiente.`);
    }
    
    consultarInfo(){

        if (this.n > 0){
            let nodoSection = document.getElementById("transferencias");
            nodoSection.innerHTML = `
                                <h2>${this.n} transferencias</h2>
                                <ul id="listaTransferencias"></ul>
                                `;
        }


        for (let i = 0; i < this.n; i++)
            this.arrayTransf[i].info();

        alert(`Usuario: ${this.usuario}\nSaldo actual: $${this.saldo}.`);
    }

    sortedInfo(ordenarPor){
        if(this.n > 0){
            let backup = this.arrayTransf;

            this.arrayTransf.sort((a,b) => a[ordenarPor] - b[ordenarPor]);

            this.consultarInfo();
            this.arrayTransf = backup;
        }
    }
}
// Fin Declaración de clases




//----------MAIN----------

// Creo una sola billetera
const myWallet = new Wallet(prompt("Ingresar usuario de la billetera"));
let amount, fecha, option;



// Menú principal
do {
    option = parseInt(prompt("Opciones\n\n" +
                            "(1) Ingresar dinero\n" +
                            "(2) Pagar\n" +
                            "(3) Ver movimientos"));

    switch (option) {
        case 1:
            amount = parseFloat(prompt("Monto a ingresar"));
            fecha = parseInt(prompt("Fecha:"));
            myWallet.ingresar(amount, fecha);
            break;

        case 2:
            amount = parseFloat(prompt("Monto a pagar"));
            fecha = parseInt(prompt("Fecha:"));
            myWallet.pagar(amount, fecha);
            break;

        case 3:
            let option2 = parseInt(prompt(`Ordenar por:\n\n(1) Fecha\n(2) Monto`));
            switch(option2){
                case 1: myWallet.sortedInfo("fecha"); break;
                case 2: myWallet.sortedInfo("amount"); break;
                default:;
            }
            break;

        default:
            alert("Adios!");
            break;
    }
} while (option > 0 && option < 4);
