
// Initialize Firebase
const loginFacebook = () => {
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
        // This gives you a Facebook Access Token.
        let token = result.credential.accessToken;
        console.log("result", result)
        // The signed-in user info.
        let user = result.user;
        console.log(result.user);
        let bienvenida = document.getElementById("nombreBienvenida")
        bienvenida.innerHTML=user.displayName
        

            let datos = {
                nombre: user.displayName,
                imagen: user.photoURL,
                email: user.email
            };
            console.log(datos)
            write("users", datos, "")
    });
}

const posts = () => {
    let establecimiento = document.getElementById("fname").value;
    let ubicacion = document.getElementById("lname").value;
    let comentario = document.getElementById("subject").value;

    let datos = {
        establecimiento: establecimiento,
        ubicacion: ubicacion,
        comentario: comentario,
        likes: 0
    }

    write("post", datos, "")
}

//Fun para escribir en la base de datos
const write = (collection, json, id) => {

    db.collection(collection).add(json)
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}

window.guanataco = {
    loginFacebook
};

/*

let login = (email, password) => {
  var email = document.getElementById("emailLogin").value;
  var password = document.getElementById("passwordLogin").value;
  firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
      firebase.database().ref('/users/' + result.user.uid).on('value', (postsRef) => {
          const userData = postsRef.val();
          const name = userData.name
          console.log("Bienvenido " + name)
      })
  })
      .catch((error) => {
          if (error.message === 'The password is invalid or the user does not have a password.') {
              alert("Contraseña o e-mail invalidos");
          } else if (error.message === 'There is no user record corresponding to this identifier. The user may have been deleted.') {
              alert("El email ingresado no corresponde a un usuario registrado.");
          }
      });
}
const register = () => {
   var name = document.getElementById("fnombre").value;
   var email = document.getElementById("fcorreo").value;
   var password = document.getElementById("fcorreo").value;
   firebase.auth().createUserWithEmailAndPassword(email, password)
       .then((result) => {
           console.log(result)
           const user = result.user;
           saveUser(user.uid, name, user.email);
       })
       .catch((error) => {
           console.log(error)
           let errorCode = error.code;
           let errorMessage = error.message;
           if (error.message === 'The email address is already in use by another account.') {
               alert("El email ya está registrado.");
           } else if (error.message === 'Password should be at least 6 characters') {
               alert("La contraseña debe tener almenos 6 caracteres");
           } else if (error.message === 'The email address is badly formatted.') {
               alert("E-mail invalido.");
           }
       })
}
const saveUser = (uid, name, email) => {
   firebase.database().ref('users/' + uid).
       set({
           id: uid,
           name: name,
           email: email
       });
}
const logout = () => {
   firebase.auth().signOut().then(() => {
   }).catch((error) => {
   });
}
*/