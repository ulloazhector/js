// Expresiones regulares
const isValidUsername   = name  =>  /^\w+([\.-]?\w+)*$/.test(name);
const isValidPin        = pin   =>  /^\d{4}$/.test(pin);

const showSignUp = () => {
    container.innerHTML = `<div class="sign-up">
    <h2>Sign Up</h2>
    <form>
        <div>
            <label for="ipt-username-signup">Username</label>
            <input type="text" id="ipt-username-signup">
        </div>
        <div>
            <label for="ipt-pin-signup">PIN <span>(4-digit number)</span></label>
            <input type="password" id="ipt-pin-signup">
        </div>
    </form>
    <button id="btn-signup">Sign Up</button>
    <a href="#" id="btn-login">Log in</a></div>
    `;

    // Agrego eventos
    const iptUsername = document.getElementById(`ipt-username-signup`);
    const iptPin      = document.getElementById(`ipt-pin-signup`);
    const btnSignup     = document.getElementById(`btn-signup`);
    const login         = document.getElementById(`btn-login`);

    btnSignup.addEventListener(`click`, () => {

        if(isValidUsername(iptUsername.value)){
            if(isValidPin(iptPin.value)){
                // Datos validos

                const usuarios = [];
                for(let i = 0; i < localStorage.length; i++)
                    usuarios.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                
                // Checkeo si el usuario ya existe
                if(!usuarios.find(obj => obj.username === iptUsername.value)){

                    // todo OK creo un nuevo usuario
                    const newUser = {
                        username:   iptUsername.value,
                        pin:        iptPin.value,
                        cards:      [],
                        contacts:   [],
                        activity:   [],
                        current:    true
                    };

                    // El usuario actual es el que se acaba de registrar
                    lastUser = newUser;
                    // Guardo el nuevo usuario
                    localStorage.setItem(`user_${newUser.username}`, JSON.stringify(newUser));

                    // Render del dashboard
                    showMainLayout();

                } else{
                    // El usuario ya esta registrado
                }
            } else {
                // PIN invalido
            }
        } else{
            // Username invalido
        }

    });

    login.addEventListener(`click`, e => {
        e.preventDefault();
        showSignIn();
    });
};


const showSignIn = () => {
    container.innerHTML = `<div class="sign-up">
    <h2>Sign In</h2>
    <form>
        <div>
            <label for="ipt-username-signin">Username</label>
            <input type="text" id="ipt-username-signin">
        </div>
        <div>
            <label for="ipt-pin-signin">PIN <span>(4-digit number)</span></label>
            <input type="password" id="ipt-pin-signin">
        </div>
    </form>
    <button id="btn-signin">Sign In</button>
    <a href="#" id="btn-createaccount">Create account</a>
    </div>
    `;

    // Agrego eventos
    const iptUsername = document.getElementById(`ipt-username-signin`);
    const iptPin      = document.getElementById(`ipt-pin-signin`);
    const btnSignIn     = document.getElementById(`btn-signin`);
    const createAccount = document.getElementById(`btn-createaccount`);

    btnSignIn.addEventListener(`click`, () => {

        // Checkeo si el usuario ya se ha sido registrado antes
        const usuarios = [];
        for(let i = 0; i < localStorage.length; i++)
            usuarios.push(JSON.parse(localStorage.getItem(localStorage.key(i))));

        if (usuarios.find(obj => obj.username   === iptUsername.value) &&
        usuarios.find(obj => obj.pin        === iptPin.value)){

            lastUser = usuarios[usuarios.findIndex(user => user.username === iptUsername.value)];
            // Cambio el estado del usuario que ingresa
            lastUser.current = true;
            // Guardo en el DB
            localStorage.setItem(`user_${lastUser.username}`, JSON.stringify(lastUser));

            // Render del dashboard
            showMainLayout();

        } else {
            // El usuario no existe o se ingresaron datos invalidos
        }
    });

    createAccount.addEventListener(`click`, e => {
        e.preventDefault();
        showSignUp();
    });

};