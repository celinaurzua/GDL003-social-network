let muro = document.getElementById("muro");
let logIn = document.getElementById("logIn");
logIn.style.display = "block";
muro.style.display="none";

const mostrarMuro = () => {
  logIn.style.display = "none";
  muro.style.display = "block";
};

document.getElementById("botonIngresar").addEventListener("click", mostrarMuro);
