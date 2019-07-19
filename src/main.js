let muro = document.getElementById("muro");
let logIn = document.getElementById("logIn");
let menu = document.getElementById("navigation")
logIn.style.display = "block";
muro.style.display="none";
menu.style.display="none"

const mostrarMuro = () => {
  menu.style.display="block"
  logIn.style.display = "none";
  muro.style.display = "block";
};

document.getElementById("botonIngresar").addEventListener("click", mostrarMuro);

const regresarLogin = () => {
  menu.style.display="none"
  logIn.style.display = "block";
  muro.style.display = "none";
};

document.getElementById("cerrarSesion").addEventListener("click", regresarLogin);