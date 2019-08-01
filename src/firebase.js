
// Initialize Firebase
const loginFacebook = () => {
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
        // This gives you a Facebook Access Token.
        let token = result.credential.accessToken;
        mostrarMuroFb();
        // The signed-in user info.
        let user = result.user;
        let bienvenida = document.getElementById("nombreBienvenida")
        bienvenida.innerHTML = user.displayName
        document.getElementById("fotoPerfil").innerHTML = `<img src="${user.photoURL}">`
        let nombrePost = document.getElementById("nombrePost")
        //nombrePost.innerHTML = user.displayName
        //document.getElementById("fotoPost").innerHTML = `<img src="${user.photoURL}">`

        let datos = {
            nombre: user.displayName,
            imagen: user.photoURL,
            email: user.email
        };
        write("users", datos, firebase.auth().currentUser.uid)
        return result;
    }, (error) => {
        console.log(error)
    });
}

const loginGoogle = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {

        mostrarMuroGoogle();
        let user = result.user;
        let bienvenida = document.getElementById("nombreBienvenida")
        bienvenida.innerHTML = user.displayName
        document.getElementById("fotoPerfil").innerHTML = `<img src="${user.photoURL}">`
        let nombrePost = document.getElementById("nombrePost")
        //nombrePost.innerHTML = user.displayName

        let datos = {
            nombre: user.displayName,
            imagen: user.photoURL,
            email: user.email
        };

        write("users", datos, firebase.auth().currentUser.uid)
    }).catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        let errorEmail = error.email;
        let credential = error.credential;

        if (errorCode === 'aut/account-exists-with-different-credential') {
            alert('Es el mismo usuario')
        }
    })
}

//Fun para escribir en la base de datos
const write = (collection, json, id) => {
    if (id == "") {
        db.collection(collection).add(json)
            .then(function (docRef) {
                console.log(docRef)
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    } else {
        db.collection(collection).doc(id).set(json)
            .then(function (docRef) {
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    }
}

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
    let name = document.getElementById("fnombre").value;
    let email = document.getElementById("fcorreo").value;
    let password = document.getElementById("fpassword").value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            var user = firebase.auth().currentUser;

            user.updateProfile({
                displayName: name,
                photoURL: "https://example.com/jane-q-user/profile.jpg"
            }).then(function () {
                let datos = {
                    nombre: firebase.auth().currentUser.displayName,
                    imagen: firebase.auth().currentUser.photoURL,
                    email: firebase.auth().currentUser.email
                };
                write("users", datos, firebase.auth().currentUser.uid)
            }).catch(function (error) {
                // An error happened.
            });
        })
        .catch((error) => {
            if (error.message === 'The email address is already in use by another account.') {
                alert("El email ya está registrado.");
            } else if (error.message === 'Password should be at least 6 characters') {
                alert("La contraseña debe tener almenos 6 caracteres");
            } else if (error.message === 'The email address is badly formatted.') {
                alert("E-mail invalido.");
            }
        })
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
        likes: 0
    }
    write("post", datos, "")
};


// const printPosts = async () => {
    db.collection("post").onSnapshot(snapshot => {
        const posts = document.getElementById("divPosts")
        let output = '';
        let changesArr = snapshot.docs;
        changesArr.forEach(changes => {
            console.log(changes.data())
            // if(changes.type == "added"){
                let datos = changes.data();
                output += `
                <section id="card">
                    <img id="imgAvatar" src="${datos.photoURL}" />
                    <div id="commentNameUser">
                        ${datos.displayName}
                    </div>
                    <br />
                    <div id="commentText">
                        <p><strong>Nombre del establecimiento:</strong><span id="nombrePrintPost">${datos.establecimiento}</span></p>
                        <p><strong>Ubicación:</strong><span id="ubicacionPrintPost">${datos.ubicacion}</span></p>
                        <p><strong>Comentario:</strong><span id="comentarioPrintPost">${datos.comentario}</span></p>
                    </div>
                    <br />
                    <div class="buttonIcon">
                        <i class="far fa-smile"></i>
                        <p class="icon"><span>XX</span> Bueno</p>
                    </div>
                    <div class="buttonIcon">
                        <i class="far fa-meh"></i>
                        <p class="icon"><span>XX</span> Regular</p>
                    </div>
                    <div class="buttonIcon">
                        <i class="far fa-frown"></i>
                        <p class="icon"><span>XX</span> Malo</p>
                    </div>
                </section>`
            // }   
            });
            posts.innerHTML = output;
        })
       // .catch(function (error) {
       //   console.log("Error getting documents: ", error);
       //});
// };

/*
const printPosts = async () => {
    const posts = document.getElementById("divPosts")
    db.collection("post").onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            if(change.type == "added"){

            }
            }
        })
    });

const printPosts = async () => {
    const posts = document.getElementById("divPosts")
    let output = '';
    db.collection("post").get()
    .then(function (query) {
        query.forEach(document => {
            datos = document.data();
                output += `
                <section id="card">
                    <img id="imgAvatar" src="${datos.photoURL}" />
                    <div id="commentNameUser">
                        ${datos.displayName}
                    </div>
                    <br />
                    <div id="commentText">
                        <p><strong>Nombre del establecimiento:</strong><span id="nombrePrintPost">${datos.establecimiento}</span></p>
                        <p><strong>Ubicación:</strong><span id="ubicacionPrintPost">${datos.ubicacion}</span></p>
                        <p><strong>Comentario:</strong><span id="comentarioPrintPost">${datos.comentario}</span></p>
                    </div>
                    <br />
                    <div class="buttonIcon">
                        <i class="far fa-smile"></i>
                        <p class="icon"><span>XX</span> Bueno</p>
                    </div>
                    <div class="buttonIcon">
                        <i class="far fa-meh"></i>
                        <p class="icon"><span>XX</span> Regular</p>
                    </div>
                    <div class="buttonIcon">
                        <i class="far fa-frown"></i>
                        <p class="icon"><span>XX</span> Malo</p>
                    </div>
                </section>
                `
            });
            posts.innerHTML = output;
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
}
*/

const logout = () => {
    firebase.auth().signOut().then(() => {
        console.log("Logged out")
    }).catch((error) => {
    });
};

window.guanataco = {
    loginGoogle,
    logout,
    loginFacebook,
    posts,
    // printPosts
};