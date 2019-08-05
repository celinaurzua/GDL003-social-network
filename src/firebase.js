// Initialize Firebase
const loginFacebook = () => {
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase
        .auth()
        .signInWithPopup(provider)
        .then(
            result => {
                // This gives you a Facebook Access Token.
                let token = result.credential.accessToken;
                mostrarMuroFb();
                // The signed-in user info.
                let user = result.user;
                let bienvenida = document.getElementById("nombreBienvenida");
                bienvenida.innerHTML = user.displayName;
                document.getElementById("fotoPerfil").innerHTML = `<img src="${
                    user.photoURL
                    }">`;
                let nombrePost = document.getElementById("nombrePost");
                //nombrePost.innerHTML = user.displayName
                //document.getElementById("fotoPost").innerHTML = `<img src="${user.photoURL}">`

                let datos = {
                    nombre: user.displayName,
                    imagen: user.photoURL,
                    email: user.email
                };
                write("users", datos, firebase.auth().currentUser.uid);
                return result;
            },
            error => {
                console.log(error);
                alert(
                    "Ya estas registrado con este correo en otra cuenta, intenta acceder con esa"
                );
            }
        );
};

const loginGoogle = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
            mostrarMuroGoogle();
            let user = result.user;
            let bienvenida = document.getElementById("nombreBienvenida");
            bienvenida.innerHTML = user.displayName;
            document.getElementById("fotoPerfil").innerHTML = `<img src="${
                user.photoURL
                }">`;
            let nombrePost = document.getElementById("nombrePost");
            //nombrePost.innerHTML = user.displayName

            let datos = {
                nombre: user.displayName,
                imagen: user.photoURL,
                email: user.email
            };

            write("users", datos, firebase.auth().currentUser.uid);
        })
        .catch(error => {
            let errorCode = error.code;
            let errorMessage = error.message;
            let errorEmail = error.email;
            let credential = error.credential;

            if (errorCode === "aut/account-exists-with-different-credential") {
                alert("Es el mismo usuario");
                console.log(errorCode);
            }
        });
};

let login = (email, password) => {
  var email = document.getElementById("emailLogin").value;
  var password = document.getElementById("passwordLogin").value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(result => { 
      posts;
      let user = result.user;
      let bienvenida = document.getElementById("nombreBienvenida");
      bienvenida.innerHTML = user.displayName;
      document.getElementById("fotoPerfil").innerHTML = `<img src="https://www.iowagcsa.org/resources/Pictures/Member-Login-Icon.png">`;

      let datos = {
        nombre: user.displayName,
        imagen: "https://www.iowagcsa.org/resources/Pictures/Member-Login-Icon.png",
        email: user.email
      };
      write("users", datos, firebase.auth().currentUser.uid);
      /*
      firebase
        .database()
        .ref("/users/" + result.user.uid)
        .on("value", postsRef => {
          const userData = postsRef.val();
          const name = userData.name;
          console.log("Bienvenido " + name);
        });
        */
      })
    .catch(error => {
      if (
        error.message ===
        "The password is invalid or the user does not have a password."
      ) {
        alert("Contraseña o e-mail invalidos");
      } else if (
        error.message ===
        "There is no user record corresponding to this identifier. The user may have been deleted."
      ) {
        alert("El email ingresado no corresponde a un usuario registrado.");
      }
    });
};

//Fun para escribir en la base de datos
const write = (collection, json, id) => {
  if (id == "") {
    db.collection(collection)
      .add(json)
      .then(function(docRef) {
        console.log(docRef);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  } else {
    db.collection(collection)
      .doc(id)
      .set(json)
      .then(function(docRef) {})
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  }
};

const register = () => {

  let name = document.getElementById("fnombre").value;
  let email = document.getElementById("fcorreo").value;
  let password = document.getElementById("fpassword").value;
  let passwordConfirm = document.getElementById("fpasswordConfirm").value;
  
  if(password != passwordConfirm){
    document.getElementById("register").disabled = true;
    document.getElementById("messageConfirm").innerHTML = "La contraseña no coinciden";
}else{
    document.getElementById("messageConfirm").innerHTML = "La contraseña sí coincide";
    document.getElementById("register").disabled = false;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(result => {
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: name,
        })
        .then( () => {
          let datos = {
            nombre: firebase.auth().currentUser.displayName,
            imagen: firebase.auth().currentUser.photoURL,
            email: firebase.auth().currentUser.email
          };
          write("users", datos, firebase.auth().currentUser.uid);
        })
        .catch((error) => {
          if (error.message === 'The email address is already in use by another account.') {
              alert("El correo electrónico ya está registrado.");
          } else if (error.message === 'Password should be at least 6 characters') {
              alert("La contraseña debe tener almenos 6 caracteres");
          } else if (error.message === 'The email address is badly formatted.') {
              alert("Correo electrónico inválido.");
          }
      })
    })
  }
    };

const posts = () => {
    let establecimiento = document.getElementById("fname").value;
    let ubicacion = document.getElementById("lname").value;
    let comentario = document.getElementById("subject").value;


    let datos = {
        userID: firebase.auth().currentUser.uid,
        establecimiento: establecimiento,
        ubicacion: ubicacion,
        comentario: comentario,
        userID: firebase.auth().currentUser.uid,
        displayName: firebase.auth().currentUser.displayName,
        photoURL: firebase.auth().currentUser.photoURL,
        bueno: 0,
        malo: 0,
        regular: 0
    };
    write("post", datos, "");
};

// const printPosts = async () => {
db.collection("post").onSnapshot(snapshot => {
  const posts = document.getElementById("divPosts");
  let output = "";
  let changesArr = snapshot.docs;
  changesArr.forEach(changes => {
    // if(changes.type == "added"){
    let datos = changes.data();

    output += `
              <section id="card">
                <div id="editDelet">
                  <i id="trash" class="far fa-trash-alt"></i>
                  <i id="edit" class="far fa-edit"></i>
                </div>
                  <img id="imgAvatar" src="${datos.photoURL}" />
                  <div id="commentNameUser">
                      ${datos.displayName}
                  </div>
                  <br />
                  <div id="commentText">
                      <p><strong>Nombre del establecimiento:</strong><br><span id="nombrePrintPost">${
                        datos.establecimiento
                      }</span></p>
                      <p><strong>Ubicación:</strong><br><span id="ubicacionPrintPost">${
                        datos.ubicacion
                      }</span></p>
                      <p><strong>Comentario:</strong><br><span id="comentarioPrintPost">${
                        datos.comentario
                      }</span></p>
                  </div>
                  <br />
                  <div class="buttonIcon">
                      <i id="${changes.id}Bueno" class="far fa-smile"></i>
                      <p class="icon"><span>${datos.bueno}</span> Bueno</p>
                  </div>
                  <div class="buttonIcon">
                      <i id="${changes.id}Regular" class="far fa-meh"></i>
                      <p class="icon"><span>${datos.regular}</span> Regular</p>
                  </div>
                  <div class="buttonIcon">
                      <i id="${changes.id}Malo" class="far fa-frown"></i>
                      <p class="icon"><span>${datos.malo}</span> Malo</p>
                  </div>
              </section>`;
    // }
  });
  posts.innerHTML = output;
  
  
  

  
  let buttonTrash = document.getElementById("trash");

  buttonTrash.addEventListener("click", alert => {
    //var txt;
    
    // var r = confirm("Seguro que deseas eliminar esta publicación");
    if (r == true) {
      // alert("Tu publicación ha sido eliminada");
     // db.collection("post").doc("id").delete()
      //.then(()=>{});
    
      //(falta hacer tag en HTML)txt = "Tu publicación ha sido cancelada";
      //db.collection("post").doc("id").delete().then((delet) => {
      //snapshot()
      }});
  /*  else{
      console.log("Cancelaste la eliminación de este post");
    }
    document.getElementById("demo").innerHTML = txt;
  };*/



 
   /* 
  .then(function() {
      console.log("Document successfully deleted!");
    })
    .catch(function(error) {
      console.error("Error removing document: ", error);
    });
*/

  let buttonIcon = document.querySelectorAll(".far");

  buttonIcon.forEach(button => {
    //console.log(button)
    button.addEventListener("click", btn => {
      //ID de boton
      btnID = btn.target.id;
      //ID del post
      id = btnID.substring(0, 20);
      //Tipo de like
      type = btnID.substring(20, btnID.length);
      console.log(id);
      //Consultar el documento en la base de datos que corresponde al id

      var docRef = db.collection("post").doc(id);

      docRef
        .get()
        .then(function(doc) {
          if (doc.exists) {
            if (type == "Bueno") {
              let total = doc.data().bueno;
              total += 1;
              return docRef
                .update({
                  bueno: total
                })
                .then(function() {})
                .catch(function(error) {
                  // The document probably doesn't exist.
                  console.error("Error updating document: ", error);
                });
            } else if (type == "Malo") {
              let total = doc.data().malo;
              total += 1;
              return docRef
                .update({
                  malo: total
                })
                .then(function() {})
                .catch(function(error) {
                  // The document probably doesn't exist.
                  console.error("Error updating document: ", error);
                });
            } else if (type == "Regular") {
              let total = doc.data().regular;
              total += 1;
              return docRef
                .update({
                  regular: total
                })
                .then(function() {})
                .catch(function(error) {
                  // The document probably doesn't exist.
                  console.error("Error updating document: ", error);
                });
            }
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
      //Extraer el conteo del tipo de like (bueno, malo, regular)
      //Sumar +1 al tipo de like
      //escribir al documento el nuevo numero del like
    });
  });
});

const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      alert("Seguro que deseas cerrar sesion");
    })
    .catch(error => {});
};


window.guanataco = {
  loginGoogle,
  logout,
  loginFacebook,
  login,
  posts,
  register
  // printPosts
};

