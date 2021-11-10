
// BOOTSTRAP

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()










  // Eventos Sidebar
  //////////////////////////////////////////////////////////////////////
  document.getElementById(`seccion-actividad`).style.display = `none`;
  document.getElementById(`seccion-perfil`).style.display = `none`;
  
  let menuTarjetas = document.getElementById(`menu-tarjetas`);
  let menuActividad = document.getElementById(`menu-actividad`);
  let menuPerfil = document.getElementById(`btn-editar-perfil`);
  
  menuTarjetas.addEventListener(`click`, selectTarjetas);
  menuActividad.addEventListener(`click`, selectActividad);
  menuPerfil.addEventListener(`click`, selectPerfil);
  



  // Cambio los displays del documento, para mostrar la seccion seleccionada
  function selectTarjetas(){
      menuTarjetas.classList.add(`active`);
      menuActividad.classList.remove(`active`);
      document.getElementById(`seccion-tarjetas`).style.display = `block`;
      document.getElementById(`seccion-actividad`).style.display = `none`;
      document.getElementById(`seccion-perfil`).style.display = `none`;
    }
    
    function selectActividad(){
        menuActividad.classList.add(`active`);
        menuTarjetas.classList.remove(`active`);
        document.getElementById(`seccion-actividad`).style.display = `block`;
        document.getElementById(`seccion-tarjetas`).style.display = `none`;
        document.getElementById(`seccion-perfil`).style.display = `none`;
    }

    function selectPerfil(){
        menuActividad.classList.remove(`active`);
        menuTarjetas.classList.remove(`active`);
        document.getElementById(`seccion-perfil`).style.display = `block`;
        document.getElementById(`seccion-actividad`).style.display = `none`;
        document.getElementById(`seccion-tarjetas`).style.display = `none`;
    }





    // Eventos Editar perfil
    //////////////////////////////////////////////////////////////////////
    let btnGuardar = document.getElementById(`guardar-info`);
    let userFirstName, userLastName, userEmail;

    btnGuardar.addEventListener(`click`, actualizarInfoUsuario);

    function actualizarInfoUsuario() {
        userFirstName   = document.getElementById(`usuario-nombre`);
        userLastName    = document.getElementById(`usuario-apellido`);
        userEmail       = document.getElementById(`usuario-correo`);

        let usuario = { FirstName:  userFirstName.value,
                        LastName:   userLastName.value,
                        Email:      userEmail.value};

        // Actualizo informacion del usuario
        usuarioJson = JSON.stringify(usuario);
        localStorage.setItem(`infoUsuario`, usuarioJson);

        // Limpio los inputs
        userFirstName.value = ``;
        userLastName.value  = ``;
        userEmail.value     = ``;

        refreshMenu();
    }

    let userMenu = document.getElementById(`user-menu`);

    function refreshMenu(){
        // Si no hay ningun usuario registrado se muestr User en el menu
        let lastUser = JSON.parse( localStorage.getItem(`infoUsuario`) );
        userMenu.innerHTML = (localStorage.length) ? lastUser.FirstName : `User`;
    }


    
    refreshMenu();