// API
const fetchDataUSD = async () => {
    const res = await fetch(`https://api.coinbase.com/v2/prices/BTC-USD/buy`);
    const data = await res.json();
    return data.data.amount;
}

const fetchDataEUR = async () => {
    const res = await fetch(`https://api.coinbase.com/v2/prices/BTC-EUR/buy`);
    const data = await res.json();
    return data.data.amount;
}

const fetchDataARS = async () => {
    const res = await fetch(`https://api.coinbase.com/v2/prices/BTC-ARS/buy`);
    const data = await res.json();
    return data.data.amount;
}

const fetchDataGBP = async () => {
    const res = await fetch(`https://api.coinbase.com/v2/prices/BTC-GBP/buy`);
    const data = await res.json();
    return data.data.amount;
}




const container = document.getElementById(`container`);

// Expresiones regulares
const isValidName   = name  =>  /^\w+([ ]\w+)+$/.test(name);
const isValidNumber   = num  =>  /^\w{16}$/.test(num);
const isValidDate   = date  =>  /^\w{2}\/\w{2}$/.test(date);
const isValidCVC   = cvc  =>  /^\w{3}$/.test(cvc);



// Muestra la billetera, una vez logueado
const showMainLayout = () => {

    container.innerHTML = `<header class="sidebar mode" id="sidebar">
    <h1>Wallet</h1>
    <ul class="menu">
        <li class="menu-item">
            <a href="#" class="active mode" id="home"><i class="fa-solid fa-house"></i><span>Overview</span></a>
        </li>
        <li class="menu-item">
            <a href="#" class="mode" id="cards"><i class="fa-solid fa-credit-card"></i><span>Cards</span></a>
        </li>
        <li class="menu-item">
            <a href="#" class="mode" id="exchange"><i class="fa-solid fa-rotate"></i><span>Exchange</span></a>
        </li>
        <li>
            <a href="#" class="mode" id="btn-toggle-mode"><i class="fa-solid fa-moon" id="icon-mode"></i><span id="text-mode">Dark mode</span></a>
        </li>
        <li class="menu-item">
            <a href="#" class="mode" id="account"><i class="fa-solid fa-user"></i><span>Account</span></a>
        </li>
    </ul>
</header>

<div class="main mode" id="main">
</div>
    `;

    const main = document.getElementById(`main`);
    const arrayItemsMenu = document.querySelector(`.menu`).querySelectorAll(`li`);

    const btnToggleMode = document.querySelector(`#btn-toggle-mode`);
    const itemsMenu       = document.querySelectorAll(`.menu-item`);

    let     activeItem  = document.querySelector(`.active`);
    let     mode        = `light`;

    // Entrada de los items del menu
    arrayItemsMenu.forEach((item, i) => {
        setTimeout( () => {
            item.classList.add(`show`);
        } ,100 * i);
    });


    // Cambio de modo (Dark mode - Light mode)
    btnToggleMode.addEventListener(`click`, () => {
        // Aplico las clase `dark-mode` a los nodos que tienen la clase `mode`
        const modeElements = document.querySelectorAll(`.mode`);

        const modeText = document.querySelector(`#text-mode`);
        const modeIcon = document.querySelector(`#icon-mode`);

        // Animacion del icono
        modeIcon.style.animation = `icon-spin 1s`;
        setTimeout(() => {modeIcon.style.removeProperty(`animation`)}, 1000);

        // Si ya esta en dark mode cambio a light mode
        // if(modeElements[0].classList.contains(`dark-mode`)){
        if(mode === `dark`){

            //a Light mode
            modeElements.forEach(elem => {
                    elem.classList.remove(`dark-mode`);
            });
            mode = `light`;
            // Cambios en el boton ToggleMode
            setTimeout(() => {
                modeText.textContent = `Dark mode`;
            }, 300);
            setTimeout(() => {
                modeIcon.classList.add(`fa-moon`);
                modeIcon.classList.remove(`fa-sun`);
            }, 200);
            
        } else {
            
            // a Dark mode
            modeElements.forEach(elem => {
                elem.classList.add(`dark-mode`);
            });
            mode = `dark`;
            
            // Cambios en el boton ToggleMode
            setTimeout(() => {
                modeText.textContent = `Light mode`;
            }, 150);
            setTimeout(() => {
                modeIcon.classList.add(`fa-sun`);
                modeIcon.classList.remove(`fa-moon`);
            }, 175);
        }

    });


    // Muestro secciones del dashboard
    const showDashboard = () => {
        const defaultCard = lastUser?.cards?.find(card => card.default === true);
        let moneyIn = 0;
        let moneyOut = 0;

        lastUser.activity?.forEach(act => {
            moneyIn     += act?.type === `received` ? act?.amount : 0;
            moneyOut    += act?.type === `sent` ? act?.amount : 0;
        });

        main.innerHTML = ``;
        main.style.overflow = `hidden`;
        main.classList.add(`dashboard`);
        main.innerHTML = 
            `<div class="cards-container-home">
                <h2 class="mode">Your Cards</h2>
                <div class="card-fav mode">
                    <div class="card-item">
                        <div class="card-body">
                            <h4 class="card-number">${defaultCard?.number ?? `**** **** **** ****`}</h4>
                            <h5 class="card-owner">${defaultCard?.name ?? `No card found`}</h5>
                            <h6 class="exp-date">${defaultCard?.date ?? `00/00`}</h6>
                            <i class="fa-brands fa-cc-${defaultCard?.type} card-logo"></i>
                        </div>
                        <div class="card-info">
                            <h3>Your money</h3>
                            <h2>$ ${defaultCard?.cash ?? `0`}</h2>
                        </div>
                    </div>
                    <div class="quick-transfer">
                        <h3 class="mode">Quick transfer</h3>
                        <div class="transfer-data">
                            <div>
                                <label for="ipt-user-dest" class="mode">Username</label>
                                <input type="text" class="mode" id="ipt-user-dest">
                            </div>
                            <div>
                                <label for="ipt-amount" class="mode">Amount</label>
                                <input type="text" class="mode" id="ipt-amount">
                            </div>
                            <button id="btn-send">Send</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="payments-home">
                <h2 class="mode">Payments</h2>
                <div class="counters">
                    <div class="counter mode counter-in">
                        <h4><i class="fa-solid fa-arrow-right"></i> Money In</h4>
                        <p class="mode">${moneyIn} <span>USD</span></p>
                    </div>
                    <div class="counter mode counter-out">
                        <h4><i class="fa-solid fa-arrow-right"></i> Money Out</h4>
                        <p class="mode">${moneyOut} <span>USD</span></p>
                    </div>
                </div>
            </div>

            <div class="contacts-home">
                <h2 class="mode">Recent contacts</h2>
                <ul class="contact-list mode" id="contact-list-dashboard">

                </ul>
            </div>

            <div class="activities-home">
                <h2 class="mode">Recent Activities</h2>
                
                <div class="date-block mode">
                    <p class="mode date">Today</p>
                    <ul class="lista-fecha" id="recent-activities">
                        
                    </ul>
                </div>
            </div>`;


        let usersHtml = ``;
        lastUser.contacts.forEach(cnt => {
            usersHtml = `
            <li class="contact-item">
                <i class="fa-solid fa-user mode"></i>
                <p class="mode">${cnt.name}</p>
            </li>` + usersHtml;
        });
        const contactListDashboard = document.getElementById(`contact-list-dashboard`);
        contactListDashboard.innerHTML = usersHtml;


        let activitiesHtml = ``;
        lastUser.activity.forEach(act => {
            activitiesHtml = 
            `<li>
                <i class="mode fa-solid fa-credit-card icon-act"></i>
                <h4 class="mode fromto">${act.fromto}</h4>
                <p class="mode type-act">${act.type}</p>
                <p class="mode amount">${act.amount} <span class="mode">USD</span></p>
            </li>
            ` + activitiesHtml;
        });
        const recentActivities = document.getElementById(`recent-activities`);
        recentActivities.innerHTML = activitiesHtml;
        



        // Eventos transferencia
        const iptUserDest = document.getElementById(`ipt-user-dest`);
        const iptAmount = document.getElementById(`ipt-amount`);
        const btnSend = document.getElementById(`btn-send`);
        
        // Transferir
        btnSend.addEventListener(`click`, () => {
            const usuarios = [];
            for(let i = 0; i < localStorage.length; i++)
                usuarios.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                
                // Verifico la cuenta destino
            if ( usuarios.find( user => user.username === iptUserDest.value) 
            && ( lastUser.username !== iptUserDest.value ) ){
                
                // Verifico el monto
                if( ( parseFloat(iptAmount.value) <= defaultCard.cash)
                && ( parseFloat(iptAmount.value) > 0) ){
                    // todo OK
                    // Datos origen
                    defaultCard.cash -= parseFloat(iptAmount.value);
                    lastUser.activity.push({
                        type: `sent`,
                        amount: parseFloat(iptAmount.value),
                        fromto: iptUserDest.value
                    });
                    lastUser.cards[lastUser.cards.findIndex(card => card.default === true)] = defaultCard;
                    if(!lastUser.contacts.find(cnt => cnt.name === iptUserDest.value)){
                        // lo agrego a contacto
                        lastUser.contacts.push({name:iptUserDest.value});
                    }
                    
                    // Sobreescribo el usuario en localStorage
                    localStorage.setItem(`user_${lastUser.username}`, JSON.stringify(lastUser));



                    // Datos destino
                    const destinyUser = usuarios[usuarios.findIndex(user => user.username === iptUserDest.value)];
                    destinyUser.cards[destinyUser.cards.findIndex(card => card.default === true)].cash += parseFloat(iptAmount.value);
                    destinyUser.activity.push({
                        type: `received`,
                        amount: parseFloat(iptAmount.value),
                        fromto: lastUser.username
                    });

                    if(!destinyUser.contacts.find(cnt => cnt.name === lastUser.username)){
                        // lo agrego a contacto
                        destinyUser.contacts.push({name: lastUser.username});
                    }
                    localStorage.setItem(`user_${destinyUser.username}`, JSON.stringify(destinyUser));

                    showDashboard();
                }
            }

        });

        isDark();


        // Animacion entrada dashboard
        const counters = document.querySelector(`.counters`);
        const activitiesBlock = document.querySelector(`.date-block`);
        const activities = activitiesBlock.querySelectorAll(`li`);
        const titles = document.querySelectorAll(`h2.mode`);
        const contactList = document.querySelector(`.contact-list`);
        const contacts = contactList.querySelectorAll(`.contact-item`);
        const cardFav = document.querySelector(`.card-fav`);

        setTimeout(() => {
            // Titulos
            titles.forEach(title => {title.classList.add(`show`)});

            // Default card
            cardFav.classList.add(`show`);

            // Contactos
            contactList.classList.add(`show`);
            contacts.forEach((cnt, i) => {
                setTimeout( () => {
                    cnt.classList.add(`show`);
                } ,150 * i);
            });

            // Actividades
            activitiesBlock.classList.add(`show`);
            activities.forEach((act, i) => {
                setTimeout( () => {
                    act.classList.add(`show`);
                } ,150 * i);
            });

            // Registro
            counters.classList.add(`show`);
            counters.querySelectorAll(`h4, p`).forEach(item => {item.classList.add(`show`)});

        }, 0);
        setTimeout(() => {main.style.overflow = `auto`}, 3000);


    }

    const showCards = () => {
        main.innerHTML = ``;
        main.classList.remove(`dashboard`);
        main.innerHTML = `
            <div class="cards-container">
                <div class="header">
                    <h2 class="mode">Your Cards</h2>
                    <button id="btn-add-card">+ Add card</button>
                </div>

                <ul class="cards-list" id="cards-list">
                    
                </ul>

            </div>

            <div class="add-card-form mode" id="add-card-form">
                <button id="btn-close-form"><i class="fa-solid fa-xmark mode"></i></button>
                <form>    
                    <h2 class="mode">Add card</h2>

                    <div>
                        <label for="ipt-add-card-name" class="mode">Name</label>
                        <input type="text" id="ipt-add-card-name" class="mode" placeholder="Card Holder">
                    </div>

                    <div>
                        <label for="ipt-add-card-number" class="mode">Card Number</label>
                        <input type="number" id="ipt-add-card-number" class="mode" placeholder="xxxx xxxx xxxx xxxx">
                    </div>

                    <div class="row">
                        <div>
                            <label for="ipt-add-card-expdate" class="mode">Expiration Date</label>
                            <input type="text" id="ipt-add-card-expdate" class="mode" placeholder="xx/xx">
                        </div>

                        <div>
                            <label for="ipt-add-card-ccv" class="mode">CVC</label>
                            <input type="number" id="ipt-add-card-cvc" class="mode" placeholder="xxx">
                        </div>
                    </div>
                    
                    <button id="btn-add-card-form" type="button">Add Card</button>
                </form>
            </div>
        `;

        // Muestro las cards

        const cardsList = document.getElementById(`cards-list`);
        let cardHtml = ``;
        lastUser.cards.forEach(card => {
            cardHtml += `
                <li>
                    <div class="card-body ${card.default ? `default` : ``}">
                        <h4 class="card-number">${card.number}</h4>
                        <h5 class="card-owner">${card.name}</h5>
                        <h6 class="exp-date"> ${card.date}</h6>
                        <i class="fa-brands fa-cc-${card.type} card-logo"></i>
                    </div>
                </li>
            `;

        });

        cardsList.innerHTML = cardHtml;
        isDark();

        const btnAddCard = document.getElementById(`btn-add-card`);
        const btnCloseForm = document.getElementById(`btn-close-form`);
        const addCardForm = document.getElementById(`add-card-form`);
        const btnAddCardForm = document.getElementById(`btn-add-card-form`);

        btnAddCard.addEventListener(`click`, () => {
            addCardForm.classList.add(`show`);
        });

        btnCloseForm.addEventListener(`click`, () => {
            addCardForm.classList.remove(`show`);
        });

        btnAddCardForm.addEventListener(`click`, () => {
            const iptName = document.getElementById(`ipt-add-card-name`).value;
            const iptNumber = document.getElementById(`ipt-add-card-number`).value;
            const iptExpDate = document.getElementById(`ipt-add-card-expdate`).value;
            const iptCvc    = document.getElementById(`ipt-add-card-cvc`).value;

            if(isValidName(iptName) && isValidNumber(iptNumber) && isValidDate(iptExpDate) && isValidCVC(iptCvc)){
                // 4 Visa - 5 MasterCard
                if(iptNumber[0] == `4` || iptNumber[0] == `5`){

                    // Agrego la nueva tarjeta
                    const newCard = {
                        name:       iptName.toUpperCase(),
                        number:     iptNumber.match(/.{1,4}/g).toString().replaceAll(`,`,` `),
                        date:       iptExpDate,
                        cvc:        iptCvc,
                        type:       iptNumber[0] == `4` ? `visa` : `mastercard`,
                        default:    lastUser.cards.length === 0 ? true : false,
                        cash:       lastUser.cards.length === 0 ? 500 : 0
                    }

                    // Actualizo el usuario
                    lastUser.cards.push(newCard);
                    localStorage.setItem(`user_${lastUser.username}`, JSON.stringify(lastUser));

                    showCards();
                }
            }
        });





    }

    const showExchange = async () => {

        const USD = await fetchDataUSD();
        const EUR = await fetchDataEUR();
        const ARS = await fetchDataARS();
        const GBP = await fetchDataGBP();

        main.innerHTML = ``;
        main.classList.remove(`dashboard`);
        main.innerHTML = `
            <div class="exchange-container">
                <ul class="currencies-list">
                    <li class="currency-item mode">
                        <p class="mode">1 USD = <i class="fa-solid fa-euro-sign"></i> ${(EUR / USD).toFixed(4)} EUR</p>
                    </li>
                    <li class="currency-item mode">
                        <p class="mode">1 <i class="fa-solid fa-bitcoin-sign"></i> =  ${(1*USD).toFixed(2)} USD</p>
                    </li>
                    <li class="currency-item mode">
                        <p class="mode">1 USD = <i class="fa-solid fa-sterling-sign"></i> ${(GBP / USD).toFixed(4)} GBP</p>
                    </li>
                </ul>
            </div>
        `;
        isDark();

    }

    const showAccount = () => {
        main.innerHTML = ``
        main.classList.remove(`dashboard`);
        main.innerHTML = `
        <div class="account-container mode">
            <div>
                <h2 class="mode"><i class="fa-solid fa-user"></i><span>@${lastUser.username}</span></h2>
                <button id="btn-logout">Salir</button>
            </div>
        </div>
        `
        isDark();

        // Agrego eventos
        const btnLogout = document.getElementById(`btn-logout`);

        // Cerrar sesion
        btnLogout.addEventListener(`click`, () => {
            lastUser.current = false;
            localStorage.setItem(`user_${lastUser.username}`, JSON.stringify(lastUser));
            showSignIn();
        });

        
    }

    const isDark = () =>{
        if(mode === `dark`){
            const modeElements = document.querySelectorAll(`.mode`);
            modeElements.forEach(elem => {
                elem.classList.add(`dark-mode`);
            });
        }
    }

    // Secciones
    itemsMenu.forEach(item => {
        item.addEventListener(`click`, e => {
            activeItem.classList.remove(`active`);
            activeItem = e.currentTarget.childNodes[1];
            activeItem.classList.add(`active`);

            // Hago un switch case de las secciones, con las llamadas a funciones
            switch (activeItem.id) {
                case `home`:
                    showDashboard();
                    break;

                case `cards`:
                    showCards();
                    break;

                case `exchange`:
                    showExchange();
                    break;
            
                case `account`:
                    showAccount();
                    break;
            
                default:
                    break;
            }

        });
    });

    showDashboard();
};

