let muro = document.getElementById("muro");
let logIn = document.getElementById("logIn");
let menu = document.getElementById("navigation")
let registro = document.getElementById("registroCorreo")
logIn.style.display = "block";
registro.style.display = "none"
muro.style.display="none";
menu.style.display="none"

const mostrarMuro = () => {
  menu.style.display="block"
  muro.style.display = "block";
  logIn.style.display = "none";
  registro.style.display = "none"
};

document.getElementById("botonIngresar").addEventListener("click", mostrarMuro);

const regresarLogin = () => {
  logIn.style.display = "block";
  menu.style.display="none"
  muro.style.display = "none";
  registro.style.display = "none"
};

document.getElementById("cerrarSesion").addEventListener("click", regresarLogin);

const formularioRegistro = () => {
  registro.style.display = "block"
  menu.style.display="none"
  logIn.style.display = "none";
  muro.style.display = "none";
};

document.getElementById("botonRegistrar").addEventListener("click", formularioRegistro);