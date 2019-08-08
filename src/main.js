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
  //window.guanataco.printPosts();
}
document.getElementById("Facebook").addEventListener("click", window.guanataco.loginFacebook);
document.getElementById("publicar").addEventListener("click", window.guanataco.posts);

const mostrarMuroGoogle = () => {
  menu.style.display = "block"
  muro.style.display = "block";
  logIn.style.display = "none";
  registro.style.display = "none";

  // window.guanataco.printPosts();
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

/*
const mostrarMuro = () => {
  menu.style.display="block"
  muro.style.display = "block";
  logIn.style.display = "none";
  registro.style.display = "none"
};
*/
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

document.getElementById("register").addEventListener("click", registroExitoso);

const regresarInicio = () => {
  logIn.style.display = "block";
  menu.style.display = "none";
  muro.style.display = "none";
  registro.style.display = "none";
};

document.getElementById("regresarInicio").addEventListener("click", regresarInicio);
