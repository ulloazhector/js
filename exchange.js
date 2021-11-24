
function getDataUSD(){
    return $.get(`https://api.coinbase.com/v2/prices/BTC-USD/buy`, (response, status) => {
        if (status === `success`)
            return response;
    })
}

function getDataARS(){
    return $.get(`https://api.coinbase.com/v2/prices/BTC-ARS/buy`, (response, status) => {
        if (status === `success`)
            return response;
    })
}





async function loadExchange() {
    const dataUSD = await getDataUSD();
    const dataARS = await getDataARS();

    // X usd = X * factorCompra ars
    const factorCompra  = await parseFloat(dataARS.data.amount) / parseFloat(dataUSD.data.amount);    
    // X usd = X * factorVenta ars
    const factorVenta   = .98*factorCompra;       


    const mainContent = $(`#main-content`);

    // Colores en el sidebar
    document.getElementById(`menu-mi-cuenta`).classList.remove(`active`);
    document.getElementById(`menu-actividad`).classList.remove(`active`);
    $(`#menu-cambio`).addClass(`active`);
    $(`#menu-tarjetas`).removeClass(`active`);


    // Genero card de cambio (Compra)
    mainContent.text(``);
    mainContent.append(`
        <div class="row mb-4">
            <div class="col-auto">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">USD Compra</h5>
                        <p class="text-muted">Precio compra: $${factorCompra.toFixed(3)} </p>
                        <div class="input-group mb-3">
                            <span class="input-group-text">USD $</span>
                            <input type="number" class="form-control" placeholder="0"
                                id="input-buyusd-usd">
                        </div>

                        <div class="input-group mb-3">
                            <span class="input-group-text"">ARS $</span>
                            <input type="number" class="form-control" placeholder="0"
                                id="input-buyusd-ars">
                        </div>
                        <a href="#" class="btn btn-primary" id="btn-buy-usd">Cambiar</a>
                    </div>
                </div>
            </div>
        </div>
    `);

    // Al escribir en un input actualizo el otro
    $(`#input-buyusd-usd`).on(`input`, (e) => {
        $(`#input-buyusd-ars`).val( (parseFloat( $(e.target).val() || 0) * factorCompra).toFixed(6) );
    });

    $(`#input-buyusd-ars`).on(`input`, (e) => {
        $(`#input-buyusd-usd`).val( (parseFloat( $(e.target).val() || 0) / factorCompra).toFixed(6));
    });


    // Al comprar
    $(`#btn-buy-usd`).click( () => {

        //Valores input
        const inputBuyUSDUsd = parseFloat($(`#input-buyusd-usd`).val());
        const inputBuyUSDArs = parseFloat($(`#input-buyusd-ars`).val());

        $(`#input-buyusd-usd`).val(``)
        $(`#input-buyusd-ars`).val(``)
        
        if(inputBuyUSDArs <= lastUser.dinero.ARS && inputBuyUSDUsd >= 0.5){
            
            // Se hace el cambio
            lastUser.dinero.USD += inputBuyUSDUsd;
            lastUser.dinero.ARS -= inputBuyUSDArs;


            // Genero una nueva actividad
            let fechaChng = new Date(Date.now());
            let horaChng = /\d{2}:\d{2}:\d{2}/.exec(fechaChng.toUTCString());

            lastUser.actividad.push({
                tipo:   `cambio`,
                amt:    inputBuyUSDUsd,
                moneda: `USD`,
                orgdes: ``,
                hora:   horaChng[0]
            });


            // Sobreescribo el usuario en localStorage
            localStorage.setItem(`user_${lastUser.username}`, JSON.stringify(lastUser));

        }

    });

    /////////////////////////////////////////////////////////


    // Genero card de cambio (Venta)
    mainContent.append(`
        <div class="row">
            <div class="col-auto">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">USD Venta</h5>
                        <p class="text-muted">Precio venta: $${factorVenta.toFixed(3)}</p>
                        <div class="input-group mb-3">
                            <span class="input-group-text">USD $</span>
                            <input type="number" class="form-control" placeholder="0"
                                id="input-sellusd-usd">
                        </div>

                        <div class="input-group mb-3">
                            <span class="input-group-text"">ARS $</span>
                            <input type="number" class="form-control" placeholder="0"
                                id="input-sellusd-ars">
                        </div>
                        <a href="#" class="btn btn-primary" id="btn-sell-usd">Cambiar</a>
                    </div>
                </div>
            </div>
        </div>
    `);

    // Al escribir en un input actualizo el otro
    $(`#input-sellusd-usd`).on(`input`, (e) => {
        $(`#input-sellusd-ars`).val( (parseFloat( $(e.target).val() || 0) * factorVenta).toFixed(3) );
    });

    $(`#input-sellusd-ars`).on(`input`, (e) => {
        $(`#input-sellusd-usd`).val( (parseFloat( $(e.target).val() || 0) / factorVenta).toFixed(3));
    });


    // Al vender
    $(`#btn-sell-usd`).click( () => {

        //Valores input
        const inputSellUSDUsd = parseFloat($(`#input-sellusd-usd`).val());
        const inputSellUSDArs = parseFloat($(`#input-sellusd-ars`).val());

        $(`#input-sellusd-usd`).val(``)
        $(`#input-sellusd-ars`).val(``)
        
        if(inputSellUSDUsd <= lastUser.dinero.USD && inputSellUSDUsd >= 0.5){
            
            // Se hace el cambio
            lastUser.dinero.USD -= inputSellUSDUsd;
            lastUser.dinero.ARS += inputSellUSDArs;


            // Genero una nueva actividad
            let fechaChng = new Date(Date.now());
            let horaChng = /\d{2}:\d{2}:\d{2}/.exec(fechaChng.toUTCString());

            lastUser.actividad.push({
                tipo:   `cambio`,
                amt:    inputSellUSDArs,
                moneda: `ARS`,
                orgdes: ``,
                hora:   horaChng[0]
            });


            // Sobreescribo el usuario en localStorage
            localStorage.setItem(`user_${lastUser.username}`, JSON.stringify(lastUser));

        }

    });



}