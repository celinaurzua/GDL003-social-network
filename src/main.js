let muro = document.getElementById("muro");
let logIn = document.getElementById("logIn");
let menu = document.getElementById("navigation")
let registro = document.getElementById("registroCorreo")
logIn.style.display = "block";
registro.style.display = "none"
muro.style.display = "none";
menu.style.display = "none"


const mostrarMuroFb = () => {
  menu.style.display = "block";
  muro.style.display = "block";
  logIn.style.display = "none";
  registro.style.display = "none";
}
document.getElementById("Facebook").addEventListener("click", window.guanataco.loginFacebook);
document.getElementById("publicar").addEventListener("click", window.guanataco.posts);

const mostrarMuroGoogle = () => {
  menu.style.display = "block"
  muro.style.display = "block";
  logIn.style.display = "none";
  registro.style.display = "none";
}
document.getElementById("google").addEventListener("click", window.guanataco.loginGoogle);
document.getElementById("publicar").addEventListener("click", window.guanataco.posts);

const mostrarMuroRegistro = () => {
    menu.style.display = "block"
    muro.style.display = "block";
    logIn.style.display = "none";
    registro.style.display = "none";
  }

document.getElementById("botonIngresar").addEventListener("click", login);

const regresarLogin = () => {
  logIn.style.display = "block";
  menu.style.display = "none";
  muro.style.display = "none";
  registro.style.display = "none";
  logout();
};

document.getElementById("cerrarSesion").addEventListener("click", regresarLogin);


const loginAfterReg = () => {
  logIn.style.display = "block";
  menu.style.display = "none";
  muro.style.display = "none";
  registro.style.display = "none";
  
};

document.getElementById("botonRegistrar").addEventListener("click", loginAfterReg);

const formularioRegistro = () => {
  registro.style.display = "block"
  menu.style.display = "none"
  logIn.style.display = "none";
  muro.style.display = "none";

};

document.getElementById("botonRegistrar").addEventListener("click", formularioRegistro);

const registroExitoso = () => {
  registro.style.display = "block"
  menu.style.display = "none"
  logIn.style.display = "none";
  muro.style.display = "none";
  alert ("Su registro fue exitoso")
  
  document.getElementById('formulario').reset()
  loginAfterReg()
};

document.getElementById("register").addEventListener("click", register);

const regresarInicio = () => {
  logIn.style.display = "block";
  menu.style.display = "none";
  muro.style.display = "none";
  registro.style.display = "none";
};

document.getElementById("regresarInicio").addEventListener("click", regresarInicio);

//PARA SACAR EL VALUE DEL OPTION DE LOS ESTADOS Y RESTRINGIR LA PUBLICACION
  
const estados = document.getElementById("estados");

estados.addEventListener("change", ()=> {

  const sectionEstado = estados.selectedIndex;
const sectionEstadoValue = estados.options;
const valueEstado = sectionEstadoValue[sectionEstado].index;

  document.getElementById("publicar").disabled = true;

if (valueEstado == 14) {
    document.getElementById("publicar").disabled = false;

  } else {
    document.getElementById("publicar").disabled = true;
   alert("Lo sentimos sólo puedes recomendar taquerias de Guadalajara");
  }
})
 