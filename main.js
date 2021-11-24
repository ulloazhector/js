// Templates
const pageContent       = document.getElementById(`page-content`);
const tmpltDashboard    = document.getElementById(`tmplt-dashboard`).content;
const tmpltSignUp       = document.getElementById(`tmplt-user-signup`).content;
const tmpltSignIn       = document.getElementById(`tmplt-user-signin`).content;
const tmpltSidebar      = document.getElementById(`tmplt-sidebar`).content;
const tmpltMiCuenta     = document.getElementById(`tmplt-mi-cuenta`).content;
const tmpltMiActividad  = document.getElementById(`tmplt-mi-actividad`).content;
const tmpltTransferir   = document.getElementById(`tmplt-transferir`).content;

const fragment = document.createDocumentFragment();

// Expresiones regulares
const isValidUsername   = name  =>  /^\w+([\.-]?\w+)*$/.test(name);
const isValidPin        = pin   =>  /^\d{4}$/.test(pin);
const timeFormat        =           /\d{2}:\d{2}:\d{2}/;

// Usuario actual
let lastUser = {};

const bgGradiente = `linear-gradient(36deg, rgba(151,167,208,1) 0%, rgba(255,255,255,1) 100%)`


// Al ingresar por primera vez
// pageContent.style.height = `100vh`;
pageContent.style.background = bgGradiente;


// Log in
function loadSignInForm() {
    
    pageContent.style.height = `100vh`;
    pageContent.innerHTML = ``;
    pageContent.classList.add(`d-flex`, `flex-column`, `justify-content-center`, `align-items-center`);
    
    // Cargo Sign in
    let clone = tmpltSignIn.cloneNode(true);
    fragment.appendChild(clone);
    pageContent.appendChild(fragment);

    const btnSignin             = document.getElementById(`btn-signin`);
    const inputUsernameSignin   = document.getElementById(`input-username-signin`);
    const inputPinSignin        = document.getElementById(`input-pin-signin`);
    const btnCreateAccount      = document.getElementById(`create-account`);

    btnSignin.addEventListener(`click`, () => {

        const usuarios = [];
        for(let i = 0; i < localStorage.length; i++)
            usuarios.push(JSON.parse(localStorage.getItem(localStorage.key(i))));

        if (usuarios.find(obj => obj.username   === inputUsernameSignin.value) &&
        usuarios.find(obj => obj.pin        === inputPinSignin.value)){
            // El usuario actual es el que se acaba de loguear
            lastUser = usuarios[usuarios.findIndex(user => user.username === inputUsernameSignin.value)];
            lastUser.current = true;
            localStorage.setItem(`user_${lastUser.username}`, JSON.stringify(lastUser));

            /* * * * * * * * * * * * * * * * * * * * * * * * * * *
                                    INGRESO
            * * * * * * * * * * * * * * * * * * * * * * * * * * */
            loadDashboard();
        }else{
            // Alerta si hay datos invalidos
            btnSignin.parentNode.removeChild(btnSignin.parentNode.lastChild);
            
            const error = document.createElement(`p`);
            error.classList.add(`text-danger`);
            error.textContent = `Datos invalidos`;
            btnSignin.parentNode.appendChild(error);
            
        }

    })

    btnCreateAccount.addEventListener(`click`, e => {
        e.preventDefault();
        loadSignUpForm();
    });

}

// Sign Up
function loadSignUpForm() {
    pageContent.style.height = `100vh`;
    
    pageContent.innerHTML = ``;
    pageContent.classList.add(`d-flex`, `flex-column`, `justify-content-center`, `align-items-center`);
    
    // Cargo Sign Up
    let clone = tmpltSignUp.cloneNode(true);
    fragment.appendChild(clone);
    pageContent.appendChild(fragment);
    
    const btnSignup     = document.getElementById(`btn-signup`);
    const inputUsername = document.getElementById(`input-username`);
    const inputPin      = document.getElementById(`input-pin`);
    const login         = document.getElementById(`login`);
    
    // Al apretar el boton verifico si los inputs son correctos
    btnSignup.addEventListener(`click`, () => {
        newUser = {
            username:   inputUsername.value,
            pin:        inputPin.value,
            dinero:     {
                            ARS: 1000,
                            USD: 0
                        },
            actividad:  [],
            tarjetas:   [],
            current:    true
        };
        
        if (!isValidUsername(inputUsername.value))
        inputUsername.classList.add(`border-danger`);
        if (!isValidPin(inputPin.value))
        inputPin.classList.add(`border-danger`);
        
        // Si esta todo ok guardo el nuevo usuario y muestro el dashboard
        const usuarios = [];
        for(let i = 0; i < localStorage.length; i++)
            usuarios.push(JSON.parse(localStorage.getItem(localStorage.key(i))));

        if (isValidUsername(inputUsername.value) && isValidPin(inputPin.value))
            if(!usuarios.find(obj => obj.username === inputUsername.value)){
                // El usuario actual es el que se acaba de registrar
                lastUser = newUser;
                localStorage.setItem(`user_${newUser.username}`, JSON.stringify(newUser));

                /* * * * * * * * * * * * * * * * * * * * * * * * * * *
                                    INGRESO
                * * * * * * * * * * * * * * * * * * * * * * * * * * */
                loadDashboard();
            }
            else {
                btnSignup.parentNode.removeChild(btnSignup.parentNode.lastChild);
                
                const error = document.createElement(`p`);
                error.classList.add(`text-danger`);
                error.textContent = `Este username ya existe`;
                btnSignup.parentNode.appendChild(error);
            }

    });
    
    // Al hacer click en un los inputs incorrectos quito el borde rojo
    inputUsername.addEventListener(`click`, () => {
        if (inputUsername.focus)
        inputUsername.classList.remove(`border-danger`);
    });
    
    inputPin.addEventListener(`click`, () => {
        if (inputPin.focus)
            inputPin.classList.remove(`border-danger`);
    });

    login.addEventListener(`click`, e => {
        e.preventDefault();
        loadSignInForm();
    });
}

// Dashboard Layout
const loadDashboard = () => {
    pageContent.style.height = `100%`;

    pageContent.innerHTML = ``;
    pageContent.classList.remove(`d-flex`, `flex-column`, `justify-content-center`, `align-items-center`)

    const clone = tmpltDashboard.cloneNode(true);
    fragment.appendChild(clone);
    pageContent.appendChild(fragment);


    // Cargo el sidebar
    loadMenu();
    // Cargo el conetenido
    loadMainContent();
}

// Mostrar menu
function loadMenu(){
    const mainContent = document.getElementById(`main-content`)
    const mainMenu = document.getElementById(`main-menu`);
    const clone = tmpltSidebar.cloneNode(true);
    fragment.appendChild(clone)
    mainMenu.appendChild(fragment);

    $(`ul.nav`).append(`
        <li class="nav-item">
            <a href="#" class="nav-link" id="menu-cambio">
                Exchange
            </a>
        </li>
    `)
    $(`ul.nav`).append(`
        <li class="nav-item">
            <a href="#" class="nav-link" id="menu-tarjetas">
                Cards
            </a>
        </li>
    `)
   

    document.getElementById(`username-sidebar`)
        .textContent = lastUser.username;

        
    const menuMiCuenta      = document.getElementById(`menu-mi-cuenta`);
    const menuActividad     = document.getElementById(`menu-actividad`);

    menuMiCuenta.addEventListener(`click`, e => {
        e.preventDefault();

        mainContent.textContent = ``;

        // Colores en el sidebar
        menuMiCuenta.classList.add(`active`);
        menuActividad.classList.remove(`active`);
        $(`#menu-cambio`).removeClass(`active`);
        $(`#menu-tarjetas`).removeClass(`active`);

        loadMainContent();
        
    });
    
    
    menuActividad.addEventListener(`click`, e => {
        e.preventDefault();
        
        mainContent.textContent = ``;
        
        // Colores en el sidebar
        menuMiCuenta.classList.remove(`active`);
        menuActividad.classList.add(`active`);
        $(`#menu-cambio`).removeClass(`active`);
        $(`#menu-tarjetas`).removeClass(`active`);

        let clone = tmpltMiActividad.cloneNode(true);
        fragment.appendChild(clone);
        mainContent.appendChild(fragment);
        loadActivity();
    });

    // Funcion en exchange.js
    $(`#menu-cambio`).click(() => {loadExchange()});
    $(`#menu-tarjetas`).click(() => {loadCards()});
}

// Cargar contenido
function loadMainContent() {
    tmpltMiCuenta.getElementById(`user-card`).textContent = `@${lastUser.username}`;
    tmpltMiCuenta.getElementById(`dinero-card-ars`).textContent = `ARS $${lastUser.dinero.ARS.toFixed(2)}`;
    tmpltMiCuenta.getElementById(`dinero-card-usd`).textContent = `USD $${lastUser.dinero.USD.toFixed(2)}`;

    const mainContent = document.getElementById(`main-content`);
    mainContent.textContent = ``;

    let clone = tmpltMiCuenta.cloneNode(true);
    fragment.appendChild(clone);
    mainContent.appendChild(fragment);
    
    clone = tmpltTransferir.cloneNode(true);
    fragment.appendChild(clone);
    mainContent.appendChild(fragment);
    
    
    // Eventos Sidebar a MainContent
    const btnSalirSidebar   = document.getElementById(`btn-salir-sidebar`);
    const btnLogoutMain     = document.getElementById(`btn-logout`);



    // Asigno los eventos
    


    btnSalirSidebar.addEventListener(`click`, e => {
        e.preventDefault();
        lastUser.current = false;
        localStorage.setItem(`user_${lastUser.username}`, JSON.stringify(lastUser));
        loadSignInForm();
    });


    btnLogoutMain.addEventListener(`click`, e => {
        e.preventDefault();
        lastUser.current = false;
        localStorage.setItem(`user_${lastUser.username}`, JSON.stringify(lastUser));
        loadSignInForm();
    });


    // Eventos modal
    const inputAmount   = document.getElementById(`input-amount`);
    const inputDestiny  = document.getElementById(`input-username-destiny`);
    const btnSend       = document.getElementById(`btn-send`);

    btnSend.addEventListener(`click`, () => {

        const usuarios = [];
        for(let i = 0; i < localStorage.length; i++)
            usuarios.push(JSON.parse(localStorage.getItem(localStorage.key(i))));

            // Verifico que exista la cuenta destino
            if ( usuarios.find( user => user.username === inputDestiny.value) 
            && ( lastUser.username !== inputDestiny.value ) ){

                // Verifico la cantidad
                let currency = $(`#ars-currency`).prop(`checked`) ? `ARS` : `USD`;

                if( ( parseFloat(inputAmount.value) <= lastUser.dinero[currency])
                && ( parseFloat(inputAmount.value) > 0) ){

                    // Transfiero
                    const destinyUser = usuarios[usuarios.findIndex(user => user.username === inputDestiny.value)];

                    let fechaTrsf = new Date(Date.now());
                    let horaTrsf = timeFormat.exec(fechaTrsf.toUTCString());
                    
                    
                    // Actualizo datos origen
                    lastUser.dinero[currency] -= parseFloat(inputAmount.value);
                    lastUser.actividad.push({
                        tipo:   `envio`,
                        amt:    parseFloat(inputAmount.value),
                        moneda: currency,
                        orgdes: inputDestiny.value,
                        hora:   horaTrsf[0]
                    });

                    // Sobreescribo el usuario en localStorage
                    localStorage.setItem(`user_${lastUser.username}`, JSON.stringify(lastUser));
                    
                    
                    // Actualizo datos destino
                    destinyUser.dinero[currency] += parseFloat(inputAmount.value);
                    destinyUser.actividad.push({
                        tipo:   `recibido`,
                        amt:    parseFloat(inputAmount.value),
                        moneda: currency,
                        orgdes: lastUser.username,
                        hora:   horaTrsf[0]
                    });

                    // Sobreescribo el usuario en localStorage
                    localStorage.setItem(`user_${destinyUser.username}`, JSON.stringify(destinyUser));
                    
                    
                    loadMainContent();
                    
                }

            }

    });
}

function loadActivity(){
    const mainContent = document.getElementById(`main-content`);
    mainContent.textContent = ``;
    
    if (lastUser.length != 0){
        if (lastUser.actividad.length != 0){
            lastUser.actividad.forEach(actividad => {

                // Modifico cada card
                tmpltMiActividad.querySelector(`p`).textContent = actividad.hora;
                tmpltMiActividad.querySelector(`h4`).textContent =  `${actividad.tipo === `envio` ? `-` : `+`} 
                $${actividad.amt} ${actividad.moneda}`;
                if(actividad.tipo === `cambio`)
                    tmpltMiActividad.querySelector(`h5`).textContent = `Conversión`;
                else
                    tmpltMiActividad.querySelector(`h5`).textContent = `Cuenta: @${actividad.orgdes}`;

                tmpltMiActividad.querySelector(`.card`).classList.remove(`border-danger`, `border-success`);
                tmpltMiActividad.querySelector(`.card`).classList
                                .add(`${actividad.tipo === `envio` ? `border-danger` : `border-success`}`); 

                let clone = tmpltMiActividad.cloneNode(true);
                fragment.prepend(clone);
            });
            mainContent.appendChild(fragment);
            
            let i = 0
            Object.values(mainContent.children).forEach(child => {
                $(child).hide(0, () => {$(child).css({
                    transition: `all 400ms`,
                    transform: `translateX(20px)`,
                    opacity: `0`
                })})
                $(child).delay(300*i++).show(0, () => {$(child).css({
                    transform: `translateX(0)`,
                    opacity: `1`
                })});
            })



        } else {

            // No hubo actividades
            h2 = document.createElement(`h2`);
            h2.textContent = `No hubo actividades hasta ahora`
            mainContent.appendChild(h2);
        }
    }
}






// MAIN

// Chequear si hay cuentas y si hay una cuenta con sesion iniciada
if(localStorage.length > 0){
    const usuarios = [];
        for(let i = 0; i < localStorage.length; i++)
            usuarios.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    
    lastUser = usuarios.find(user => user.current === true);

    if (lastUser != null)   loadDashboard();
    else                    loadSignInForm();

} else {
    loadSignUpForm();
}