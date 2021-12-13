let lastUser = {};
// Reviso la "base de datos"
if(localStorage.length > 0){
    const usuarios = [];
    for(let i = 0; i < localStorage.length; i++)
    usuarios.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    
    lastUser = usuarios.find(user => user.current === true);

    // Si hay sesion iniciada muestro el dashboard
    if (lastUser != null)   showMainLayout();
    // si no hay sesion iniciada llamo a Sign In
    else                    showSignIn();
    
} else {
    // si no hay nadie logueado llamo a Sign Up
    showSignUp();
}