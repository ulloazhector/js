const isValidName   = name  =>  /^\w+([ ]\w+)+$/.test(name);
const isValidNumber   = num  =>  /^\w{16}$/.test(num);
const isValidDate   = date  =>  /^\w{2}\/\w{2}$/.test(date);
const isValidCCV   = ccv  =>  /^\w{3}$/.test(ccv);



function loadCards(){

    const mainContent = $(`#main-content`);
    // Colores en el sidebar
    document.getElementById(`menu-mi-cuenta`).classList.remove(`active`);
    document.getElementById(`menu-actividad`).classList.remove(`active`);
    $(`#menu-cambio`).removeClass(`active`);
    $(`#menu-tarjetas`).addClass(`active`);

    // Genero card vacia tipo add +
    mainContent.text(``);
    mainContent.append(`
        <div class="card" id="empty-card">
            <div class="card-body">
                <button class="btn" id="btn-add-card"><h4>+ Add card</h4></button>
            </div>
        </div>
        
        <div id="cards-container"></div>
    `);

    // Muestro las tarjetas del usuario
    lastUser.tarjetas.forEach(card => {
        $(`#cards-container`).prepend(`
            <div class="card credit-card">
                <div class="card-body cuerpo-tarjeta">
                    <h4 class="numero-de-tarjeta">**** **** **** ${card.numero.slice(12,16)}</h4>
                    <h5 class="titular-de-tarjeta">${card.titular.trim().toUpperCase()}</h5>
                    <h6 class="expiracion-de-tarjeta">${card.fecha}</h6>
                    <img class="logo-de-tarjeta" src="images/${card.tipo === `VISA` ? `visa` : `mc`}-logo.png" alt="logo tarjeta">
                </div>
            </div>
        `)
    })


    // Creo formulario para agregar una tarjeta
    $(`#btn-add-card`).click(() => {
        mainContent.append(`
            <div class="form-add-card bg-light shadow-lg">
                <button type="button" class="btn-close m-3" aria-label="Close" id="btn-close-add-card"></button>
                <form class="col-12 mb-3 px-5">    
                    <h3 class="my-5">Agregar tarjeta</h2>

                    <div class="mb-3">
                        <label for="input-add-card-name" class="form-label">Titular</label>
                        <input type="text" class="form-control" id="input-add-card-name" placeholder="Nombre Apellido">
                    </div>

                    <div class="mb-3">
                        <label for="input-add-card-number" class="form-label">Número</label>
                        <input type="number" class="form-control" id="input-add-card-number" placeholder="xxxx xxxx xxxx xxxx">
                    </div>

                    <div class="row mb-3">
                        <div class="col-6 mb-3">
                            <label for="input-add-card-expdate" class="form-label">Hasta</label>
                            <input type="text" class="form-control" id="input-add-card-expdate" placeholder="xx/xx">
                        </div>

                        <div class="col-6 mb-4">
                            <label for="input-add-card-ccv" class="form-label">CCV</label>
                            <input type="number" class="form-control" id="input-add-card-ccv" placeholder="xxx">
                        </div>
                    </div>
                    
                    
                    <div class="row mb-5">
                        <div class="col">
                            <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                                <input type="radio" class="btn-check" name="btnradio" id="input-card-visa" autocomplete="off" checked>
                                <label class="btn btn-outline-warning" for="input-card-visa">
                                    <img src="images/visa-logo.png" alt="" class="logo-de-tarjeta">
                                </label>
                            
                                <input type="radio" class="btn-check" name="btnradio" id="input-card-mc" autocomplete="off">
                                <label class="btn btn-outline-warning" for="input-card-mc">
                                    <img src="images/mc-logo.png" alt="" class="logo-de-tarjeta">
                                </label>
                            </div>
                        </div>
                    </div>

                    <button class="btn btn-primary mt-5" id="btn-add-card-form" type="button">Agregar</button>
                </form>
                        
            </div>
        `);

        // Cerrar formulario
        $(`#btn-close-add-card`).click(() => {
            $(`.form-add-card`).remove();
        })


        // Capturo datos del formulario
        $(`#btn-add-card-form`).click(() => {

            const newCardName   = $(`#input-add-card-name`).val();
            const newCardNumber = $(`#input-add-card-number`).val();
            const newCardDate   = $(`#input-add-card-expdate`).val();
            const newCardCCV    = $(`#input-add-card-ccv`).val();
            const newCardType   = $(`#input-card-visa`).prop(`checked`);


            if( isValidName(newCardName.trim()) 
            &&  isValidNumber(newCardNumber) 
            &&  isValidDate(newCardDate)
            &&  isValidCCV(newCardCCV) ){
                
                // Agrego la nueva tarjeta
                $(`#cards-container`).prepend(`
                    <div class="card credit-card">
                        <div class="card-body cuerpo-tarjeta">
                            <h4 class="numero-de-tarjeta">**** **** **** ${newCardNumber.slice(12,16)}</h4>
                            <h5 class="titular-de-tarjeta">${newCardName.trim().toUpperCase()}</h5>
                            <h6 class="expiracion-de-tarjeta">${newCardDate}</h6>
                            <img class="logo-de-tarjeta" src="images/${newCardType ? `visa` : `mc`}-logo.png" alt="logo tarjeta">
                        </div>
                    </div>
                `);

                const newCard = {
                    titular: newCardName.toUpperCase(),
                    numero: newCardNumber,
                    fecha: newCardDate,
                    ccv: newCardCCV,
                    tipo: newCardType ? `VISA` : `MASTERCARD`
                }

                // Actualizo el usuario y el localStorage
                lastUser.tarjetas.push(newCard);
                localStorage.setItem(`user_${lastUser.username}`, JSON.stringify(lastUser));

            }

            // Cierro el formulario
            $(`.form-add-card`).remove();
        });



    });



}


/* <div class="card" id="credit-card">
    <div class="card-body" id="cuerpo-tarjeta">
        <h4 class="numero-de-tarjeta">**** **** **** 1234</h4>
        <h5 class="titular-de-tarjeta">Hector Ulloa</h5>
        <h6 class="expiracion-de-tarjeta">02/23</h6>
        <img class="logo-de-tarjeta" src="images/mc-logo.png" alt="">
    </div>
</div> */