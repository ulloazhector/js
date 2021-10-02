var name = prompt("Ingrese su nombre");
var hour = parseInt( prompt("Ingrese la hora (00 - 23)") );
var validTime = (hour >= 0 && hour < 24);


if (name != "") {

    if (validTime) {
        // Datos válidos
        if (hour < 7 || hour > 19)
            alert("¡Buenas noches " + name + '!');
        else if (hour < 13)
            alert("¡Buenos días "   + name + '!');
        else
            alert("¡Buenas tardes " + name + '!');
    }
    else
        alert("Hora invalida");
}
else
    alert("Nombre no ingresado");